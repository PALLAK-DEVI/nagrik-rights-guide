import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Copy,
  Download,
  FileText,
  Info,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/nagrik/app-shell";
import { DisclaimerBanner } from "@/components/nagrik/brand";
import {
  ConfidenceBadge,
  DocumentPreview,
  EmptyState,
  SourceCard,
  StatusBadge,
} from "@/components/nagrik/ui-bits";
import { CATEGORY_LABEL, INDIAN_STATES } from "@/lib/nagrik/data";
import { analyzeCase, suggestRtiStructure } from "@/lib/nagrik/ai";
import { DOC_TYPE_LABEL, generateDocument, type DocFields } from "@/lib/nagrik/documents";
import { downloadDocument } from "@/lib/nagrik/download";
import { newId, useStore } from "@/lib/nagrik/store";
import type { CaseAnswer } from "@/lib/nagrik/types";

export const Route = createFileRoute("/case/$id")({
  head: () => ({
    meta: [
      { title: "Case workspace — NyayaSetu" },
      {
        name: "description",
        content:
          "Your case analysis: what NyayaSetu understands, what it still needs, the sources used and your recommended next steps.",
      },
      { property: "og:title", content: "Case workspace — NyayaSetu" },
      { property: "og:description", content: "Source-backed analysis, confidence and action plan for your case." },
    ],
  }),
  component: CasePage,
});

function CasePage() {
  const { id } = Route.useParams();
  const { cases, ready, saveCase, saveDocument, profile } = useStore();
  const navigate = useNavigate();
  const record = cases.find((c) => c.id === id);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [fields, setFields] = useState<DocFields>({
    name: "",
    counterparty: "",
    property: "",
    amount: "",
    date: "",
    state: "",
    issue: "",
    extra: "",
  });

  useEffect(() => {
    if (!record) return;
    setAnswers(Object.fromEntries(record.answers.map((a) => [a.questionId, a.answer])));
    setFields((f) => ({
      ...f,
      name: profile?.name ?? f.name,
      state: record.state || f.state,
      property: record.district || f.property,
      issue: record.category === "rti" ? suggestRtiStructure(record.description, record.district).subject : f.issue,
      counterparty:
        record.category === "rti"
          ? suggestRtiStructure(record.description, record.district).authority
          : f.counterparty,
      extra:
        record.category === "rti"
          ? suggestRtiStructure(record.description, record.district)
              .questions.map((q, i) => `${i + 1}. ${q}`)
              .join("\n")
          : f.extra,
    }));
  }, [record, profile]);

  const rti = useMemo(
    () => (record?.category === "rti" ? suggestRtiStructure(record.description, record.district) : null),
    [record],
  );

  if (!ready) {
    return (
      <AppShell title="Case">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="h-40 animate-pulse rounded-xl bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        </div>
      </AppShell>
    );
  }

  if (!record) {
    return (
      <AppShell title="Case not found">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon={<CircleAlert className="size-5" />}
            title="We couldn't find this case"
            description="It may have been deleted, or opened on a different device. Your cases are stored locally."
            action={
              <Button asChild>
                <Link to="/new-case">Start a new case</Link>
              </Button>
            }
          />
        </div>
      </AppShell>
    );
  }

  const a = record.analysis;

  async function updateAnalysis() {
    if (!record) return;
    setUpdating(true);
    const questionMap = new Map(a.missing_information.map((q) => [q.id, q.question]));
    const merged: CaseAnswer[] = [
      ...record.answers.filter((x) => !answers[x.questionId]),
      ...Object.entries(answers)
        .filter(([, v]) => v.trim())
        .map(([questionId, answer]) => ({
          questionId,
          question: questionMap.get(questionId) ?? questionId,
          answer,
        })),
    ];
    const stateAnswer = merged.find((x) => x.questionId === "state")?.answer;
    const next = await analyzeCase({
      description: record.description,
      category: record.category,
      state: stateAnswer || record.state,
      district: record.district ?? "",
      answers: merged,
    });
    saveCase({
      ...record,
      state: stateAnswer || record.state,
      answers: merged,
      analysis: next,
      status: next.missing_information.length ? "needs_info" : "action_ready",
      updatedAt: new Date().toISOString(),
    });
    setUpdating(false);
    toast.success("Analysis updated");
  }

  function openGenerator() {
    setDocContent("");
    setDocOpen(true);
  }

  function handleGenerate() {
    if (!record) return;
    setDocContent(generateDocument(record.category, fields));
    toast.success("Document generated");
  }

  function handleSaveDoc() {
    if (!record || !docContent) return;
    saveDocument({
      id: newId(),
      name: DOC_TYPE_LABEL[record.category],
      type: DOC_TYPE_LABEL[record.category],
      caseId: record.id,
      caseTitle: record.title,
      content: docContent,
      createdAt: new Date().toISOString(),
    });
    saveCase({ ...record, status: "completed", updatedAt: new Date().toISOString() });
    toast.success("Saved to your documents");
    setDocOpen(false);
  }

  return (
    <AppShell title={record.title} description={CATEGORY_LABEL[record.category]}>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{record.ref}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{CATEGORY_LABEL[record.category]}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{record.state || "State not set"}</span>
            <StatusBadge status={record.status} />
            <ConfidenceBadge level={a.confidence} />
          </div>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{record.title}</h2>
          <p className="mt-2 text-muted-foreground">{a.summary}</p>
        </div>

        {/* Section A */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">What we understand</h3>
          <Card>
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">You told us</p>
                <p className="mt-1 rounded-lg bg-muted px-3 py-2.5 text-sm">{record.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  We understand this as
                </p>
                <p className="mt-1 text-sm font-medium">{a.summary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Facts on record</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {a.facts.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section B */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">What we need to know</h3>
          {a.missing_information.length === 0 ? (
            <Card>
              <CardContent className="flex items-center gap-2 p-5 text-sm">
                <CheckCircle2 className="size-4 text-success" aria-hidden />
                You&apos;ve answered everything we need for an indicative assessment.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="space-y-5 p-5">
                {a.missing_information.map((q, i) => (
                  <div key={q.id} className="space-y-2">
                    <Label className="text-sm font-medium">
                      {i + 1}. {q.question}
                    </Label>
                    {q.type === "choice" ? (
                      <div className="flex flex-wrap gap-2">
                        {(q.options ?? []).map((opt) => (
                          <Button
                            key={opt}
                            type="button"
                            size="sm"
                            variant={answers[q.id] === opt ? "default" : "outline"}
                            onClick={() => setAnswers((s) => ({ ...s, [q.id]: opt }))}
                          >
                            {opt}
                          </Button>
                        ))}
                      </div>
                    ) : q.type === "state" ? (
                      <Select
                        value={answers[q.id] ?? ""}
                        onValueChange={(v) => setAnswers((s) => ({ ...s, [q.id]: v }))}
                      >
                        <SelectTrigger className="w-full sm:max-w-sm">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={answers[q.id] ?? ""}
                        onChange={(e) => setAnswers((s) => ({ ...s, [q.id]: e.target.value }))}
                        placeholder="Type your answer"
                        className="sm:max-w-md"
                      />
                    )}
                  </div>
                ))}
                <Button onClick={updateAnalysis} disabled={updating}>
                  {updating ? "Updating..." : "Update Analysis"}
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Rights */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">What may apply to your situation</h3>
          {a.potential_rights.map((r) => (
            <Card key={r.title}>
              <CardContent className="space-y-4 p-5">
                <h4 className="font-semibold">{r.title}</h4>
                <p className="text-sm text-muted-foreground">{r.explanation}</p>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Why this may apply</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {r.why.map((w) => (
                      <li key={w} className="flex gap-2">
                        <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Confidence */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Information quality</h3>
          <Card>
            <CardContent className="grid gap-5 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Assessment confidence
                </p>
                <div className="mt-2">
                  <ConfidenceBadge level={a.confidence} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{a.confidence_reason}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Information completeness
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={a.completeness} className="h-2" />
                  <span className="text-sm font-medium">{a.completeness}%</span>
                </div>
                {a.missing_labels.length ? (
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {a.missing_labels.map((m) => (
                      <li key={m} className="flex gap-2">
                        <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">Nothing outstanding.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTI structure */}
        {rti ? (
          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Suggested RTI structure</h3>
            <Card>
              <CardContent className="space-y-4 p-5">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Public authority</p>
                  <p className="mt-1 text-sm font-medium">{rti.authority}</p>
                  <p className="mt-1 flex items-start gap-1.5 text-xs text-warning-foreground">
                    <CircleAlert className="mt-0.5 size-3 shrink-0" aria-hidden />
                    Suggested public authority — please verify before submission.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Subject</p>
                  <p className="mt-1 text-sm">{rti.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Questions</p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {rti.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ol>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Time period</p>
                    <p className="mt-1 text-sm">{rti.period}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                    <p className="mt-1 text-sm">{rti.location}</p>
                  </div>
                </div>
                <Button onClick={openGenerator}>
                  <FileText className="size-4" /> Generate RTI Application
                </Button>
              </CardContent>
            </Card>
          </section>
        ) : null}

        {/* Action plan */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Your recommended next steps</h3>
          <div className="space-y-3">
            {a.action_steps.map((s, i) => (
              <Card key={s.id}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  </div>
                  {s.action ? (
                    <Button
                      variant={s.action.kind === "generate-document" ? "default" : "outline"}
                      onClick={() => {
                        if (s.action?.kind === "generate-document") openGenerator();
                        else if (record.category === "scheme") navigate({ to: "/schemes" });
                        else navigate({ to: "/sources" });
                      }}
                      className="shrink-0"
                    >
                      {s.action.label} <ArrowRight className="size-4" />
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Sources used</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {a.sources.map((s) => (
              <SourceCard key={s.id} source={s} />
            ))}
          </div>
        </section>

        <DisclaimerBanner />
      </div>

      {/* Document generator */}
      <Dialog open={docOpen} onOpenChange={setDocOpen}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate your document</DialogTitle>
            <DialogDescription>
              {DOC_TYPE_LABEL[record.category]} — review and edit the details before generating.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" value={fields.name} onChange={(v) => setFields({ ...fields, name: v })} />
            <Field
              label={record.category === "rti" ? "Public authority" : "Other party's name"}
              value={fields.counterparty}
              onChange={(v) => setFields({ ...fields, counterparty: v })}
            />
            <Field
              label={record.category === "tenant" ? "Property address" : "Address / location"}
              value={fields.property}
              onChange={(v) => setFields({ ...fields, property: v })}
            />
            <Field
              label={record.category === "rti" ? "Fee paid" : "Amount"}
              value={fields.amount}
              onChange={(v) => setFields({ ...fields, amount: v })}
            />
            <Field
              label={record.category === "rti" ? "Time period" : "Relevant date"}
              value={fields.date}
              onChange={(v) => setFields({ ...fields, date: v })}
            />
            <Field label="State" value={fields.state} onChange={(v) => setFields({ ...fields, state: v })} />
            <div className="space-y-2 sm:col-span-2">
              <Label>{record.category === "rti" ? "Subject" : "Issue summary"}</Label>
              <Input value={fields.issue} onChange={(e) => setFields({ ...fields, issue: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>{record.category === "rti" ? "Questions" : "Additional notes"}</Label>
              <Textarea
                rows={4}
                value={fields.extra ?? ""}
                onChange={(e) => setFields({ ...fields, extra: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleGenerate}>
              <Sparkles className="size-4" /> Generate Document
            </Button>
          </div>

          {docContent ? (
            <div className="space-y-3">
              <DocumentPreview content={docContent} />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => downloadDocument(DOC_TYPE_LABEL[record.category], docContent)}>
                  <Download className="size-4" /> Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await navigator.clipboard.writeText(docContent);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-4" /> Copy
                </Button>
                <Button variant="outline" onClick={() => setDocContent("")}>
                  Edit
                </Button>
                <Button variant="secondary" onClick={handleSaveDoc}>
                  <Save className="size-4" /> Save
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
