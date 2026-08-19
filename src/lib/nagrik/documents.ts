import type { Category } from "./types";
import { DISCLAIMER } from "./data";

export interface DocFields {
  name: string;
  counterparty: string;
  property: string;
  amount: string;
  date: string;
  state: string;
  issue: string;
  extra?: string;
}

export const DOC_TYPE_LABEL: Record<Category, string> = {
  tenant: "Security Deposit Refund Request",
  consumer: "Consumer Complaint Letter",
  rti: "RTI Application",
  scheme: "Scheme Application Request",
};

const today = () => new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function generateDocument(category: Category, f: DocFields): string {
  if (category === "tenant") {
    return `Date: ${today()}

To,
${f.counterparty || "[Landlord's name]"}
${f.property || "[Property address]"}

Subject: Request for refund of security deposit${f.amount ? ` of ${f.amount}` : ""}

Dear Sir/Madam,

I, ${f.name || "[Your name]"}, was a tenant at ${f.property || "[property address]"}${
      f.state ? `, ${f.state}` : ""
    }. I vacated the premises on ${f.date || "[move-out date]"}.

At the commencement of the tenancy I paid a refundable security deposit${
      f.amount ? ` of ${f.amount}` : ""
    }. Despite the tenancy having ended, the deposit has not been refunded to me and I have not received a written explanation for any deduction.

I therefore request you to:
1. Refund the security deposit${f.amount ? ` of ${f.amount}` : ""} within 15 days of receipt of this letter; or
2. Provide a written, itemised statement of any deductions along with supporting bills or evidence.

${f.issue || "I would prefer to resolve this matter amicably."} Kindly treat this as a formal written request. In the absence of a response, I may explore the dispute-resolution options available to me.

Yours sincerely,
${f.name || "[Your name]"}
${f.extra || ""}

---
${DISCLAIMER}`;
  }

  if (category === "consumer") {
    return `Date: ${today()}

To,
${f.counterparty || "[Seller / Brand name]"}
${f.property || "[Seller address]"}

Subject: Complaint regarding defective product and request for redressal

Dear Sir/Madam,

I, ${f.name || "[Your name]"}, purchased ${f.issue || "[product description]"}${
      f.amount ? ` for ${f.amount}` : ""
    } on ${f.date || "[purchase date]"}. The product developed a defect shortly after purchase and has not functioned as expected.

I have attempted to contact you regarding this issue and have not received a satisfactory resolution.

I therefore request that you, within 15 days of receiving this letter:
1. Repair or replace the product, or refund the amount paid; and
2. Confirm your decision to me in writing.

If I do not receive a response, I may register a grievance with the consumer grievance redressal mechanism available in ${
      f.state || "[state]"
    }.

Yours sincerely,
${f.name || "[Your name]"}
${f.extra || ""}

---
${DISCLAIMER}`;
  }

  if (category === "rti") {
    return `Date: ${today()}

To,
The Public Information Officer
${f.counterparty || "[Suggested public authority — please verify before submission]"}
${f.property || "[Office address]"}

Subject: ${f.issue || "Request for information under the Right to Information Act, 2005"}

Sir/Madam,

I, ${f.name || "[Your name]"}, a citizen of India, request the following information under the Right to Information Act, 2005, in respect of ${
      f.property || "[location / area]"
    } for the period ${f.date || "[time period]"}:

${f.extra || "1.\n2.\n3."}

I am enclosing the prescribed application fee${f.amount ? ` of ${f.amount}` : " of Rs. 10"}. Kindly provide the information within the statutory time period. If any part of this request is held by another public authority, kindly transfer it and inform me.

Yours faithfully,
${f.name || "[Your name]"}
State: ${f.state || "[state]"}

---
${DISCLAIMER}`;
  }

  return `Date: ${today()}

To,
The Concerned Officer
${f.counterparty || "[Implementing department]"}
${f.state || "[State]"}

Subject: Request for information and assistance regarding ${f.issue || "[scheme name]"}

Sir/Madam,

I, ${f.name || "[Your name]"}, residing at ${f.property || "[address]"}, wish to apply for ${
    f.issue || "[scheme name]"
  }. Based on an indicative screening of my details, I believe I may meet the eligibility criteria.

Kindly confirm:
1. The documents required to complete my application;
2. The office at which the application should be submitted;
3. The expected processing timeline.

${f.extra || ""}

Yours faithfully,
${f.name || "[Your name]"}

---
${DISCLAIMER}`;
}
