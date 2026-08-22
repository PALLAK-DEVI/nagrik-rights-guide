import type { Category, SourceRef } from "./types";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const CATEGORY_LABEL: Record<Category, string> = {
  consumer: "Consumer Rights",
  tenant: "Tenant & Rental",
  rti: "RTI",
  scheme: "Government Schemes",
};

export const DISCLAIMER =
  "Informational assistance only — not legal advice. NyayaSetu does not provide legal representation.";

export const DEMO_NOTE =
  "DEMO DATA — Replace with verified official source before production.";

export const SOURCES: SourceRef[] = [
  {
    id: "src-consumer-1",
    title: "Consumer Protection framework — demo reference record",
    type: "Legislation (Demo record)",
    topic: "consumer",
    relevance:
      "Describes consumer remedies for defective goods and deficient services, including complaint forums.",
    lastUpdated: "2024-11-02",
    demo: true,
  },
  {
    id: "src-consumer-2",
    title: "National Consumer Helpline guidance — demo reference record",
    type: "Government portal (Demo record)",
    topic: "consumer",
    relevance: "Explains how a consumer grievance is registered and escalated.",
    lastUpdated: "2025-01-18",
    demo: true,
  },
  {
    id: "src-tenant-1",
    title: "Model tenancy principles on security deposits — demo reference record",
    type: "Policy document (Demo record)",
    topic: "tenant",
    relevance:
      "Covers limits on security deposit, timelines for refund and permissible deductions.",
    lastUpdated: "2024-08-21",
    demo: true,
  },
  {
    id: "src-tenant-2",
    title: "State rent authority procedure — demo reference record",
    type: "State rules (Demo record)",
    topic: "tenant",
    relevance: "Outlines where a tenant may raise a deposit dispute in their state.",
    lastUpdated: "2025-02-06",
    demo: true,
  },
  {
    id: "src-rti-1",
    title: "Right to Information — request procedure demo reference record",
    type: "Legislation (Demo record)",
    topic: "rti",
    relevance:
      "Describes how an application is addressed to a Public Information Officer and response timelines.",
    lastUpdated: "2024-12-11",
    demo: true,
  },
  {
    id: "src-rti-2",
    title: "RTI fee and format guidance — demo reference record",
    type: "Government portal (Demo record)",
    topic: "rti",
    relevance: "Explains application fee, format and first-appeal routes.",
    lastUpdated: "2025-03-04",
    demo: true,
  },
  {
    id: "src-scheme-1",
    title: "Government scheme eligibility index — demo reference record",
    type: "Scheme portal (Demo record)",
    topic: "scheme",
    relevance: "Lists indicative income, age and category criteria used for screening.",
    lastUpdated: "2025-04-15",
    demo: true,
  },
  {
    id: "src-scheme-2",
    title: "Documents commonly required for scheme applications — demo reference record",
    type: "Guidance note (Demo record)",
    topic: "scheme",
    relevance: "Summarises identity, income and residence documents usually requested.",
    lastUpdated: "2025-05-09",
    demo: true,
  },
];

export interface DemoScheme {
  id: string;
  name: string;
  summary: string;
  minAge: number;
  maxAge: number;
  maxIncome: number;
  occupations: string[];
  requiredDocs: string[];
}

export const DEMO_SCHEMES: DemoScheme[] = [
  {
    id: "scheme-housing",
    name: "Demo Affordable Housing Support Scheme",
    summary: "Indicative support for first-time home construction or purchase.",
    minAge: 21,
    maxAge: 60,
    maxIncome: 600000,
    occupations: ["Salaried", "Self-employed", "Daily wage", "Farmer", "Other"],
    requiredDocs: ["Income certificate", "Residence proof", "Aadhaar"],
  },
  {
    id: "scheme-farmer",
    name: "Demo Farmer Income Support Scheme",
    summary: "Indicative periodic income support for small and marginal cultivators.",
    minAge: 18,
    maxAge: 75,
    maxIncome: 300000,
    occupations: ["Farmer"],
    requiredDocs: ["Land record", "Bank account details"],
  },
  {
    id: "scheme-skill",
    name: "Demo Skill Training & Stipend Scheme",
    summary: "Indicative short-term skilling programme with a training stipend.",
    minAge: 18,
    maxAge: 35,
    maxIncome: 450000,
    occupations: ["Student", "Unemployed", "Daily wage", "Other"],
    requiredDocs: ["Education certificate", "Aadhaar"],
  },
  {
    id: "scheme-senior",
    name: "Demo Senior Citizen Assistance Scheme",
    summary: "Indicative monthly assistance for low-income senior citizens.",
    minAge: 60,
    maxAge: 120,
    maxIncome: 240000,
    occupations: ["Retired", "Unemployed", "Other"],
    requiredDocs: ["Age proof", "Income certificate"],
  },
];

export const DEMO_SCENARIOS = [
  {
    id: "demo-tenant",
    category: "tenant" as Category,
    label: "Tenant security deposit dispute",
    state: "Assam",
    text: "My landlord hasn't returned my ₹20,000 security deposit two months after I moved out.",
  },
  {
    id: "demo-consumer",
    category: "consumer" as Category,
    label: "Consumer complaint",
    state: "Maharashtra",
    text: "I bought a washing machine that stopped working after 20 days and the seller isn't responding.",
  },
  {
    id: "demo-rti",
    category: "rti" as Category,
    label: "RTI request",
    state: "Bihar",
    text: "I want to know how much money was spent on road construction in my district last year.",
  },
];
