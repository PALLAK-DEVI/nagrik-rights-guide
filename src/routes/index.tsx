import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileSearch,
  Home,
  MessageSquareText,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteFooter, SiteNav } from "@/components/nagrik/site-chrome";
import { DEMO_SCENARIOS } from "@/lib/nagrik/data";
import type { Category } from "@/lib/nagrik/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NagrikAI — Understand your rights. Know your next step." },
      {
        name: "description",
        content:
          "NagrikAI turns complicated Indian government and legal information into a clear explanation, personalized action plan and ready-to-use documents.",
      },
      { property: "og:title", content: "NagrikAI — Understand your rights. Know your next step." },
      {
        property: "og:description",
        content:
          "AI for civic and legal empowerment: source-backed explanations, action plans and documents for Indian citizens.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    n: "01",
    icon: MessageSquareText,
    title: "Tell us what happened",
    text: "Describe your problem in your own words. No legal language required.",
  },
  {
    n: "02",
    icon: ScanSearch,
    title: "We understand the situation",
    text: "AI identifies the issue and asks only for the information needed.",
  },
  {
    n: "03",
    icon: FileSearch,
    title: "We find the relevant information",
    text: "Relevant government and legal sources are retrieved and shown to you.",
  },
  {
    n: "04",
    icon: CheckCircle2,
    title: "Get your next step",
    text: "Receive a simple explanation, action plan and useful documents.",
  },
];

const AREAS: { icon: typeof Home; title: string; text: string; category: Category }[] = [
  {
    icon: ShoppingBag,
    title: "Consumer Rights",
    text: "Bought a defective product? Understand your options.",
    category: "consumer",
  },
  {
    icon: Home,
    title: "Tenant & Rental",
    text: "Security deposit, rent disputes and rental issues.",
    category: "tenant",
  },
  {
    icon: FileSearch,
    title: "RTI",
    text: "Turn a question into a structured RTI application.",
    category: "rti",
  },
  {
    icon: Building2,
    title: "Government Schemes",
    text: "Understand whether you may qualify for a government scheme.",
    category: "scheme",
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="hero-grid-bg border-b border-border">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              AI for Civic &amp; Legal Empowerment
            </span>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
              Your rights shouldn&apos;t require a law degree.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              NagrikAI turns complicated government and legal information into a clear explanation,
              personalized action plan, and ready-to-use documents.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/new-case">
                  Check My Rights <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/" hash="how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Short on time?</span>
              {DEMO_SCENARIOS.map((d) => (
                <Button
                  key={d.id}
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate({ to: "/new-case", search: { demo: d.id } })}
                >
                  Try Demo: {d.label.split(" ")[0]}
                </Button>
              ))}
            </div>
          </div>

          {/* Hero mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-lift)] sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs text-muted-foreground">CASE #001</span>
                <span className="rounded-full border border-warning/40 bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning-foreground">
                  More information needed
                </span>
              </div>
              <p className="mt-4 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                You told us
              </p>
              <p className="mt-1 rounded-lg bg-muted px-3 py-2.5 text-sm">
                &ldquo;My landlord hasn&apos;t returned my security deposit.&rdquo;
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Potential issue
                  </p>
                  <p className="mt-1 text-sm font-medium">Rental / Security Deposit</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Sources
                  </p>
                  <p className="mt-1 text-sm font-medium">3 authoritative sources</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-success/30 bg-success/8 p-3">
                <p className="text-[11px] font-semibold tracking-wide text-success uppercase">
                  Recommended next step
                </p>
                <p className="mt-1 text-sm font-medium">Send a formal refund request</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden />
                Informational assistance only — not legal advice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container-page scroll-mt-20 py-16 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            Four steps from a confusing situation to a document you can actually send.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-4.5" aria-hidden />
                </span>
                <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported areas */}
      <section className="border-y border-border bg-surface py-16 lg:py-24">
        <div className="container-page">
          <h2 className="text-3xl font-semibold sm:text-4xl">What NagrikAI covers today</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We deliberately focus on four everyday areas instead of pretending to cover every law.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((a) => (
              <Card key={a.title} className="flex h-full flex-col transition-shadow hover:shadow-[var(--shadow-lift)]">
                <CardContent className="flex h-full flex-col p-5">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <a.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{a.text}</p>
                  <Button
                    variant="ghost"
                    className="mt-4 justify-start px-0 hover:bg-transparent hover:underline"
                    onClick={() => navigate({ to: "/new-case", search: { category: a.category } })}
                  >
                    Explore <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">AI that shows its work.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              NagrikAI does not simply generate answers from a language model. Every meaningful
              answer is built on retrieved documents, and you can see what was used and why.
            </p>
            <dl className="mt-8 space-y-6">
              {[
                {
                  icon: ShieldCheck,
                  t: "Source-backed",
                  d: "Important answers are grounded in retrieved documents and official sources.",
                },
                {
                  icon: ScanSearch,
                  t: "Transparent",
                  d: "See why a source was considered relevant.",
                },
                {
                  icon: TriangleAlert,
                  t: "Honest about uncertainty",
                  d: "If information is missing or uncertain, NagrikAI tells you instead of pretending.",
                },
              ].map((p) => (
                <div key={p.t} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-semibold">{p.t}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{p.d}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Source
            </p>
            <h3 className="mt-1 font-semibold">
              Consumer Protection framework — official source record
            </h3>
            <p className="mt-5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Relevance
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Describes consumer remedies for defective goods and how a complaint can be escalated —
              directly matching the situation you described.
            </p>
            <p className="mt-5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Last updated
            </p>
            <p className="mt-1 text-sm">2024-11-02</p>
            <Button asChild variant="outline" className="mt-6 w-full sm:w-auto">
              <Link to="/sources">View source</Link>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              DEMO DATA — Replace with verified official source before production.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-sidebar py-16 text-sidebar-foreground lg:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-2xl font-semibold text-balance sm:text-3xl">
            Have a civic problem you&apos;re not sure how to handle?
          </h2>
          <Button asChild size="lg" variant="secondary">
            <Link to="/new-case">
              Start Your Case <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
