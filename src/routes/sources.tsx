import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/nagrik/app-shell";
import { SourceCard } from "@/components/nagrik/ui-bits";
import { CATEGORY_LABEL, SOURCES } from "@/lib/nagrik/data";
import type { Category } from "@/lib/nagrik/types";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Verified information sources — NagrikAI" },
      {
        name: "description",
        content:
          "The library of records NagrikAI retrieves from, why each source matters and when it was last updated.",
      },
      { property: "og:title", content: "Verified information sources — NagrikAI" },
      {
        property: "og:description",
        content: "See the sources behind every NagrikAI answer, with relevance and last-updated dates.",
      },
    ],
  }),
  component: SourcesPage,
});

const FILTERS: Array<{ key: "all" | Category; label: string }> = [
  { key: "all", label: "All" },
  { key: "rti", label: CATEGORY_LABEL.rti },
  { key: "consumer", label: CATEGORY_LABEL.consumer },
  { key: "tenant", label: CATEGORY_LABEL.tenant },
  { key: "scheme", label: CATEGORY_LABEL.scheme },
];

function SourcesPage() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const list = SOURCES.filter((s) => filter === "all" || s.topic === filter);

  return (
    <AppShell title="Sources" description="What NagrikAI's answers are built on">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">Verified Information Sources</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            NagrikAI prioritizes official government portals, legislation, regulations and
            authoritative public documents. Every answer shows which records were used and why.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <SourceCard source={s} />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Why we use sources</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A language model on its own can sound confident and still be wrong. NagrikAI retrieves
            records first and answers second, so you can check the basis of every statement. Where a
            real source has not been integrated yet, the record is clearly labelled as demo data and
            must be replaced with a verified official source before production use.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
