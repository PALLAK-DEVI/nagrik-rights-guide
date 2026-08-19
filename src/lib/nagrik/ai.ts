import { DISCLAIMER, SOURCES } from "./data";
import type { Analysis, CaseAnswer, Category, Confidence } from "./types";

/**
 * Modular AI layer.
 *
 * `analyzeCase` is the single entry point the UI uses. Today it is backed by a
 * deterministic mock that returns the same structured JSON schema a real
 * RAG backend would return (intent -> facts -> missing info -> retrieval ->
 * grounded response -> action plan). To connect a real model later, replace the
 * body of `analyzeCase` with a server-function call that returns `Analysis`.
 */

export interface AnalyzeInput {
  description: string;
  category?: Category | "auto";
  state?: string;
  district?: string;
  answers?: CaseAnswer[];
}

const KEYWORDS: Record<Category, string[]> = {
  tenant: ["landlord", "deposit", "rent", "tenant", "flat", "house owner", "lease", "vacate"],
  consumer: [
    "bought",
    "product",
    "seller",
    "refund",
    "warranty",
    "defective",
    "shop",
    "delivery",
    "service",
  ],
  rti: ["rti", "information", "government spent", "records", "how much money", "department"],
  scheme: ["scheme", "eligible", "eligibility", "subsidy", "pension", "yojana", "benefit"],
};

export function classifyCategory(text: string): Category {
  const t = text.toLowerCase();
  let best: Category = "consumer";
  let bestScore = 0;
  (Object.keys(KEYWORDS) as Category[]).forEach((cat) => {
    const score = KEYWORDS[cat].reduce((n, k) => (t.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  });
  return best;
}

function extractAmount(text: string): string | null {
  const m = text.match(/₹\s?[\d,]+|\brs\.?\s?[\d,]+/i);
  return m ? m[0].replace(/\s+/g, " ").trim() : null;
}

function titleFor(category: Category, text: string): string {
  const t = text.toLowerCase();
  if (category === "tenant") return "Security deposit not returned";
  if (category === "consumer")
    return t.includes("washing") ? "Defective washing machine, seller unresponsive" : "Defective product / seller not responding";
  if (category === "rti") return "RTI request for public expenditure information";
  return "Government scheme eligibility check";
}

const QUESTIONS: Record<Category, Analysis["missing_information"]> = {
  tenant: [
    { id: "agreement", question: "Do you have a written rental agreement?", type: "choice", options: ["Yes", "No", "Not sure"] },
    { id: "reason", question: "Did the landlord provide a reason for withholding the deposit?", type: "choice", options: ["Yes", "No"] },
    { id: "inspection", question: "Was the property inspected when you moved out?", type: "choice", options: ["Yes", "No", "Not sure"] },
    { id: "state", question: "Which state is the property in?", type: "state" },
  ],
  consumer: [
    { id: "invoice", question: "Do you have the invoice or purchase receipt?", type: "choice", options: ["Yes", "No", "Not sure"] },
    { id: "warranty", question: "Was the product within its warranty period?", type: "choice", options: ["Yes", "No", "Not sure"] },
    { id: "contacted", question: "Have you contacted the seller or brand in writing?", type: "choice", options: ["Yes", "No"] },
    { id: "value", question: "What was the approximate purchase value?", type: "text" },
  ],
  rti: [
    { id: "authority", question: "Which department or office do you think holds this information?", type: "text" },
    { id: "period", question: "Which time period should the information cover?", type: "text" },
    { id: "location", question: "Which district or area does your request relate to?", type: "text" },
    { id: "bpl", question: "Do you hold a Below Poverty Line card (fee exemption may apply)?", type: "choice", options: ["Yes", "No", "Not sure"] },
  ],
  scheme: [
    { id: "age", question: "What is your age?", type: "text" },
    { id: "income", question: "What is your approximate annual household income?", type: "text" },
    { id: "occupation", question: "What is your occupation?", type: "text" },
    { id: "state", question: "Which state do you live in?", type: "state" },
  ],
};

function rightsFor(category: Category, amount: string | null): Analysis["potential_rights"] {
  switch (category) {
    case "tenant":
      return [
        {
          title: "Rules relating to your rental agreement and security deposit may be relevant",
          explanation:
            "Based on the information you provided, rules relating to your rental agreement and security deposit may be relevant. The exact position can depend on your state, your rental agreement and the reason given for withholding the deposit.",
          why: [
            `A deposit${amount ? ` of ${amount}` : ""} appears to have been paid and not returned after you vacated.`,
            "Retrieved tenancy material discusses refund timelines and permissible deductions.",
            "No documented reason for a deduction has been recorded so far.",
          ],
        },
      ];
    case "consumer":
      return [
        {
          title: "Consumer remedies for a defective product may be relevant",
          explanation:
            "Based on what you described, consumer protection rules relating to defective goods and deficiency in service may apply. Whether a replacement, repair or refund is appropriate can depend on the warranty terms and the seller's response.",
          why: [
            "The product appears to have failed shortly after purchase.",
            "Retrieved consumer material describes remedies for defective goods.",
            "The seller appears unresponsive, which is relevant to escalation.",
          ],
        },
      ];
    case "rti":
      return [
        {
          title: "A right to seek information from a public authority may apply",
          explanation:
            "Your question appears to seek records held by a public authority, which is the kind of information an RTI application is normally used for. The correct public authority must be verified before you file.",
          why: [
            "The request concerns public expenditure records.",
            "Retrieved RTI material describes the application route and response timelines.",
            "The specific department is suggested, not confirmed.",
          ],
        },
      ];
    default:
      return [
        {
          title: "Scheme eligibility screening may be relevant",
          explanation:
            "Your details can be screened against indicative eligibility criteria. Final eligibility is always decided by the implementing authority based on submitted documents.",
          why: [
            "You asked about qualifying for government support.",
            "Retrieved scheme material lists indicative age, income and category criteria.",
            "Document requirements still need to be confirmed.",
          ],
        },
      ];
  }
}

function stepsFor(category: Category): Analysis["action_steps"] {
  const common = {
    id: "s1",
    title: "Collect your documents",
    description:
      "Keep your agreement, receipts, payment records and any written communication with the other party in one place.",
  };
  switch (category) {
    case "tenant":
      return [
        common,
        {
          id: "s2",
          title: "Send a written request",
          description:
            "Request the return of the deposit and ask for an explanation of any deductions. Keep proof of delivery.",
          action: { label: "Generate Request", kind: "generate-document" },
        },
        {
          id: "s3",
          title: "Escalate if unresolved",
          description:
            "Review the dispute-resolution options available in your location if there is no response within a reasonable time.",
          action: { label: "Explore Options", kind: "explore-options" },
        },
      ];
    case "consumer":
      return [
        common,
        {
          id: "s2",
          title: "Send a written complaint to the seller",
          description:
            "State the defect, the date of purchase and the resolution you are asking for, with a clear deadline.",
          action: { label: "Generate Request", kind: "generate-document" },
        },
        {
          id: "s3",
          title: "Escalate if unresolved",
          description:
            "Consider registering a grievance with the consumer grievance mechanism available for your location.",
          action: { label: "Explore Options", kind: "explore-options" },
        },
      ];
    case "rti":
      return [
        {
          id: "s1",
          title: "Identify the correct public authority",
          description:
            "Confirm which office holds the records before filing. NagrikAI only suggests a likely authority.",
        },
        {
          id: "s2",
          title: "Draft your RTI application",
          description: "Frame short, factual, answerable questions with a clear time period.",
          action: { label: "Generate Request", kind: "generate-document" },
        },
        {
          id: "s3",
          title: "File and track",
          description:
            "Submit with the applicable fee and keep the acknowledgement for follow-up or a first appeal.",
          action: { label: "Explore Options", kind: "explore-options" },
        },
      ];
    default:
      return [
        {
          id: "s1",
          title: "Screen your eligibility",
          description: "Enter your details to see which demo schemes may match your profile.",
          action: { label: "Explore Options", kind: "explore-options" },
        },
        common,
        {
          id: "s2",
          title: "Prepare an application request",
          description: "Generate a formal request letter you can adapt for the implementing office.",
          action: { label: "Generate Request", kind: "generate-document" },
        },
      ];
  }
}

export async function analyzeCase(input: AnalyzeInput): Promise<Analysis> {
  await new Promise((r) => setTimeout(r, 350));
  const category: Category =
    !input.category || input.category === "auto"
      ? classifyCategory(input.description)
      : input.category;

  const answers = input.answers ?? [];
  const answered = new Set(answers.filter((a) => a.answer.trim()).map((a) => a.questionId));
  const all = QUESTIONS[category];
  const missing = all.filter((q) => !answered.has(q.id));

  const amount = extractAmount(input.description);
  const facts = [
    `Issue described in the citizen's own words${amount ? `, involving ${amount}` : ""}.`,
    input.state ? `Location: ${input.state}${input.district ? `, ${input.district}` : ""}.` : "Location not yet provided.",
    ...answers.filter((a) => a.answer.trim()).map((a) => `${a.question} — ${a.answer}`),
  ];

  const completeness = Math.round(((all.length - missing.length) / all.length) * 70) + (input.state ? 30 : 0);
  const confidence: Confidence = completeness >= 90 ? "high" : completeness >= 55 ? "medium" : "low";

  return {
    category,
    summary: summaryFor(category, amount),
    facts,
    missing_information: missing,
    potential_rights: rightsFor(category, amount),
    action_steps: stepsFor(category),
    sources: SOURCES.filter((s) => s.topic === category),
    confidence,
    confidence_reason:
      missing.length > 0
        ? `More detail is needed (${missing.map((m) => m.question.replace(/\?$/, "")).slice(0, 2).join("; ")}) for a more precise assessment.`
        : "You have provided the key details needed for an indicative assessment.",
    completeness: Math.min(completeness, 100),
    missing_labels: missing.map((m) => m.question),
    disclaimer: DISCLAIMER,
  };
}

function summaryFor(category: Category, amount: string | null) {
  switch (category) {
    case "tenant":
      return `Potential rental/security-deposit dispute${amount ? ` involving ${amount}` : ""}.`;
    case "consumer":
      return "Potential consumer complaint about a defective product or unresponsive seller.";
    case "rti":
      return "Potential request for information held by a public authority.";
    default:
      return "Potential government scheme eligibility screening.";
  }
}

export function caseTitle(category: Category, description: string) {
  return titleFor(category, description);
}

export interface RtiStructure {
  authority: string;
  subject: string;
  questions: string[];
  period: string;
  location: string;
}

export function suggestRtiStructure(text: string, district?: string): RtiStructure {
  const t = text.toLowerCase();
  const road = t.includes("road") || t.includes("construction");
  return {
    authority: road
      ? "Public Works Department (District office) — suggested public authority, please verify before submission"
      : "Concerned district administration office — suggested public authority, please verify before submission",
    subject: road
      ? "Request for information regarding allocation and expenditure on road construction"
      : "Request for information regarding the matter described below",
    period: "Last completed financial year",
    location: district || "Your district",
    questions: road
      ? [
          "What was the total amount allocated for road construction works in the district during the last financial year?",
          "What was the total amount actually spent against that allocation?",
          "Please provide a list of road works sanctioned, with their sanctioned cost and completion status.",
        ]
      : [
          "Please provide the records relating to the matter described in this application.",
          "Please provide the amounts sanctioned and spent, if applicable.",
          "Please provide the name and designation of the officer responsible for these records.",
        ],
  };
}
