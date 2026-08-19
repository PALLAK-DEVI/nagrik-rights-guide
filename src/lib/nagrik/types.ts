export type Category = "consumer" | "tenant" | "rti" | "scheme";

export type Confidence = "low" | "medium" | "high";

export interface MissingQuestion {
  id: string;
  question: string;
  type: "choice" | "text" | "state";
  options?: string[];
}

export interface SourceRef {
  id: string;
  title: string;
  type: string;
  topic: Category;
  relevance: string;
  lastUpdated: string;
  url?: string;
  demo: boolean;
}

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  action?: { label: string; kind: "generate-document" | "explore-options" };
}

export interface PotentialRight {
  title: string;
  explanation: string;
  why: string[];
}

export interface Analysis {
  category: Category;
  summary: string;
  facts: string[];
  missing_information: MissingQuestion[];
  potential_rights: PotentialRight[];
  action_steps: ActionStep[];
  sources: SourceRef[];
  confidence: Confidence;
  confidence_reason: string;
  completeness: number;
  missing_labels: string[];
  disclaimer: string;
}

export interface CaseAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export type CaseStatus = "analyzing" | "needs_info" | "action_ready" | "completed";

export interface CaseRecord {
  id: string;
  ref: string;
  title: string;
  category: Category;
  state: string;
  district?: string;
  description: string;
  status: CaseStatus;
  analysis: Analysis;
  answers: CaseAnswer[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  caseId?: string;
  caseTitle?: string;
  content: string;
  createdAt: string;
}

export interface Profile {
  name: string;
  email: string;
  state?: string;
  district?: string;
  language?: string;
}
