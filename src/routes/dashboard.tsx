import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, FileSearch, FileText, Home, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/nagrik/app-shell";
import { DisclaimerBanner } from "@/components/nagrik/brand";
import { CaseCard, EmptyState, LoadingState } from "@/components/nagrik/ui-bits";
import { useStore } from "@/lib/nagrik/store";
import type { Category } from "@/lib/nagrik/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NagrikAI" },
      { name: "description", content: "Your civic cases, generated documents and next steps in one place." },
      { property: "og:title", content: "Dashboard — NagrikAI" },
      { property: "og:description", content: "Track your civic cases, documents and action plans." },
    ],
  }),
  component: Dashboard,
});

const ISSUES: { icon: typeof Home; title: string; text: string; category: Category }[] = [
  { icon: ShoppingBag, title: "Consumer problem", text: "Defective product or unresponsive seller", category: "consumer" },
  { icon: Home, title: "Tenant / rental issue", text: "Deposit, rent or agreement dispute", category: "tenant" },
  { icon: FileSearch, title: "RTI request", text: "Ask a public authority for information", category: "rti" },
  { icon: Building2, title: "Government scheme", text: "Check whether you may qualify", category: "scheme" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { profile, cases, documents, ready } = useStore();
  const navigate = useNavigate();

  return (
    <AppShell title="Dashboard" description="Your cases and next steps">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {greeting()}, {profile?.name ?? "Nagrik"}
            </h2>
            <p className="mt-1 text-muted-foreground">Understand your rights. Know your next step.</p>
          </div>
          <Button asChild size="lg">
            <Link to="/new-case">
              <Plus className="size-4" /> Start a new case
            </Link>
          </Button>
        </div>

        <section>
          <h3 className="text-lg font-semibold">How can we help?</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ISSUES.map((i) => (
              <button
                key={i.category}
                onClick={() => navigate({ to: "/new-case", search: { category: i.category } })}
                className="rounded-xl border border-border bg-card p-5 text-left transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <i.icon className="size-5" aria-hidden />
                </span>
                <span className="mt-4 block font-semibold">{i.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{i.text}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your recent cases</h3>
            <Button asChild variant="ghost" size="sm">
              <Link to="/cases">View all</Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {!ready ? (
              <LoadingState rows={2} />
            ) : cases.length === 0 ? (
              <EmptyState
                title="No cases yet"
                description="Describe a problem in your own words and NagrikAI will identify the issue and suggest your next step."
                action={
                  <Button asChild>
                    <Link to="/new-case">Start your first case</Link>
                  </Button>
                }
              />
            ) : (
              cases.slice(0, 3).map((c) => <CaseCard key={c.id} record={c} />)
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved documents</h3>
            <Button asChild variant="ghost" size="sm">
              <Link to="/documents">View all</Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {documents.length === 0 ? (
              <Card className="sm:col-span-2">
                <CardContent className="p-5 text-sm text-muted-foreground">
                  No documents yet. Generated letters and applications will appear here.
                </CardContent>
              </Card>
            ) : (
              documents.slice(0, 4).map((d) => (
                <Link key={d.id} to="/documents" className="block">
                  <Card className="transition-shadow hover:shadow-[var(--shadow-lift)]">
                    <CardContent className="flex items-center gap-3 p-5">
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="size-4.5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{d.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {d.type} · {new Date(d.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </section>

        <DisclaimerBanner />
      </div>
    </AppShell>
  );
}
