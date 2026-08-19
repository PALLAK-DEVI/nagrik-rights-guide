import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check, CircleAlert, FileText, Inbox, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABEL } from "@/lib/nagrik/data";
import type { CaseRecord, Confidence, SourceRef } from "@/lib/nagrik/types";

export function ConfidenceBadge({ level }: { level: Confidence }) {
  const map: Record<Confidence, string> = {
    high: "bg-success/12 text-success border-success/30",
    medium: "bg-warning/15 text-warning-foreground border-warning/40",
    low: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        map[level],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {level} confidence
    </span>
  );
}

export function StatusBadge({ status }: { status: CaseRecord["status"] }) {
  const map: Record<CaseRecord["status"], { label: string; className: string }> = {
    analyzing: { label: "Analyzing", className: "bg-muted text-muted-foreground border-border" },
    needs_info: { label: "More information needed", className: "bg-warning/15 text-warning-foreground border-warning/40" },
    action_ready: { label: "Action plan ready", className: "bg-success/12 text-success border-success/30" },
    completed: { label: "Completed", className: "bg-primary/10 text-primary border-primary/25" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", s.className)}>
      {s.label}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <div className="mb-3 grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-5" aria-hidden />}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function ProgressIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ul className="space-y-3">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-3 text-sm">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
                done && "border-success bg-success text-success-foreground",
                active && "border-primary text-primary",
                !done && !active && "border-border text-muted-foreground",
              )}
            >
              {done ? (
                <Check className="size-3.5" aria-hidden />
              ) : active ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
              ) : (
                <span className="size-1.5 rounded-full bg-current" aria-hidden />
              )}
            </span>
            <span className={cn(done || active ? "text-foreground" : "text-muted-foreground")}>{s}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function SourceCard({ source }: { source: SourceRef }) {
  return (
    <Card className="h-full transition-shadow hover:shadow-[var(--shadow-lift)]">
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full text-[11px] font-medium">
            {source.type}
          </Badge>
          <Badge variant="outline" className="rounded-full text-[11px]">
            {CATEGORY_LABEL[source.topic]}
          </Badge>
          {source.demo ? (
            <span className="rounded-full border border-warning/40 bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning-foreground">
              DEMO
            </span>
          ) : null}
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Source</p>
          <h3 className="mt-1 text-sm leading-snug font-semibold">{source.title}</h3>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Relevance</p>
          <p className="mt-1 text-sm text-muted-foreground">{source.relevance}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Last updated</p>
            <p className="text-sm">{source.lastUpdated}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/sources" hash={source.id}>
              View source
            </Link>
          </Button>
        </div>
        {source.demo ? (
          <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
            <CircleAlert className="mt-0.5 size-3 shrink-0" aria-hidden />
            DEMO DATA — Replace with verified official source before production.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function CaseCard({ record }: { record: CaseRecord }) {
  return (
    <Card className="transition-shadow hover:shadow-[var(--shadow-lift)]">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{record.ref}</span>
            <StatusBadge status={record.status} />
            <ConfidenceBadge level={record.analysis.confidence} />
          </div>
          <h3 className="mt-2 truncate text-base font-semibold">{record.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {CATEGORY_LABEL[record.category]} · {record.state || "State not set"} ·{" "}
            {new Date(record.updatedAt).toLocaleDateString("en-IN")}
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/case/$id" params={{ id: record.id }}>
            Continue
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function DocumentPreview({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
        <FileText className="size-3.5" aria-hidden />
        Document preview
      </div>
      <pre className="max-h-[28rem] overflow-auto px-4 py-5 font-sans text-[13px] leading-relaxed whitespace-pre-wrap sm:px-8 sm:text-sm">
        {content}
      </pre>
    </div>
  );
}
