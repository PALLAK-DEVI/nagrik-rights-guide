import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/nagrik/app-shell";
import { CaseCard, EmptyState, LoadingState } from "@/components/nagrik/ui-bits";
import { useStore } from "@/lib/nagrik/store";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "My cases — NagrikAI" },
      { name: "description", content: "Search and continue your saved civic and legal cases." },
      { property: "og:title", content: "My cases — NagrikAI" },
      { property: "og:description", content: "Search, filter and continue your civic cases." },
    ],
  }),
  component: CasesPage,
});

const FILTERS = ["All", "Active", "Completed", "Documents generated"] as const;

function CasesPage() {
  const { cases, documents, ready } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const withDocs = useMemo(() => new Set(documents.map((d) => d.caseId)), [documents]);

  const list = cases.filter((c) => {
    const matches = `${c.title} ${c.category} ${c.state}`.toLowerCase().includes(q.toLowerCase());
    if (!matches) return false;
    if (filter === "Active") return c.status !== "completed";
    if (filter === "Completed") return c.status === "completed";
    if (filter === "Documents generated") return withDocs.has(c.id);
    return true;
  });

  return (
    <AppShell title="My cases" description="Everything you've asked NagrikAI about">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search your cases"
              className="pl-9"
              aria-label="Search cases"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {!ready ? (
          <LoadingState />
        ) : list.length === 0 ? (
          <EmptyState
            title={cases.length ? "No cases match your filters" : "No cases yet"}
            description={
              cases.length
                ? "Try a different search term or filter."
                : "Start by describing a problem in your own words."
            }
            action={
              <Button asChild>
                <Link to="/new-case">Start a new case</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {list.map((c) => (
              <CaseCard key={c.id} record={c} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
