import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/nagrik/app-shell";
import { DisclaimerBanner } from "@/components/nagrik/brand";
import { DEMO_SCHEMES, INDIAN_STATES } from "@/lib/nagrik/data";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Check scheme eligibility — NyayaSetu" },
      {
        name: "description",
        content:
          "Screen your age, income, state and occupation against indicative government scheme criteria.",
      },
      { property: "og:title", content: "Check scheme eligibility — NyayaSetu" },
      { property: "og:description", content: "Indicative screening against government scheme criteria." },
    ],
  }),
  component: SchemesPage,
});

const OCCUPATIONS = ["Salaried", "Self-employed", "Farmer", "Daily wage", "Student", "Unemployed", "Retired", "Other"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "Prefer not to say"];

function SchemesPage() {
  const [form, setForm] = useState({
    age: "",
    state: "",
    income: "",
    occupation: "",
    category: "Prefer not to say",
    disability: "No",
    family: "",
  });
  const [checked, setChecked] = useState(false);

  const age = Number(form.age) || 0;
  const income = Number(form.income.replace(/[^\d]/g, "")) || 0;

  const results = DEMO_SCHEMES.map((s) => {
    const reasons: string[] = [];
    const missing: string[] = [];
    let ok = true;
    if (age >= s.minAge && age <= s.maxAge) reasons.push("Age requirement appears satisfied");
    else ok = false;
    if (income && income <= s.maxIncome) reasons.push("Income appears within the stated threshold");
    else if (!income) missing.push("Annual household income");
    else ok = false;
    if (form.state) reasons.push(`State matches (${form.state})`);
    else missing.push("State");
    if (form.occupation && !s.occupations.includes(form.occupation)) ok = false;
    else if (form.occupation) reasons.push(`Occupation category considered (${form.occupation})`);
    missing.push(...s.requiredDocs.map((d) => `${d} (document)`));
    return { scheme: s, eligible: ok, reasons, missing };
  }).filter((r) => r.eligible || r.reasons.length >= 2);

  return (
    <AppShell title="Scheme eligibility" description="Indicative screening against demo criteria">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">Check scheme eligibility</h2>
          <p className="mt-2 text-muted-foreground">
            Answer a few questions to see which schemes may be worth exploring. Final eligibility is
            always decided by the implementing authority.
          </p>
        </div>

        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" inputMode="numeric" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="e.g. 34" />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                <SelectTrigger className="w-full">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual household income (₹)</Label>
              <Input id="income" inputMode="numeric" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} placeholder="e.g. 280000" />
            </div>
            <div className="space-y-2">
              <Label>Occupation</Label>
              <Select value={form.occupation} onValueChange={(v) => setForm({ ...form, occupation: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPATIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category (where legally relevant)</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Disability status (where relevant)</Label>
              <Select value={form.disability} onValueChange={(v) => setForm({ ...form, disability: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["No", "Yes", "Prefer not to say"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="family">Family details (members, dependents)</Label>
              <Input id="family" value={form.family} onChange={(e) => setForm({ ...form, family: e.target.value })} placeholder="e.g. 4 members, 2 dependents" />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={() => setChecked(true)}>Check eligibility</Button>
            </div>
          </CardContent>
        </Card>

        {checked ? (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Possible schemes</h3>
            {results.length === 0 ? (
              <Card>
                <CardContent className="p-5 text-sm text-muted-foreground">
                  Based on the details provided, none of the demo schemes appear to match. Adding more
                  detail may change this result.
                </CardContent>
              </Card>
            ) : (
              results.map((r) => (
                <Card key={r.scheme.id}>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold">{r.scheme.name}</h4>
                      <span
                        className={
                          r.eligible
                            ? "rounded-full border border-success/30 bg-success/12 px-2.5 py-0.5 text-xs font-medium text-success"
                            : "rounded-full border border-warning/40 bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning-foreground"
                        }
                      >
                        {r.eligible ? "Potentially eligible" : "Needs more information"}
                      </span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        DEMO DATA
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.scheme.summary}</p>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Why</p>
                      <ul className="mt-1 space-y-1 text-sm">
                        {r.reasons.map((x) => (
                          <li key={x} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Missing</p>
                      <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                        {r.missing.map((x) => (
                          <li key={x} className="flex gap-2">
                            <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Source: Government scheme eligibility index — demo reference record. DEMO DATA —
                      Replace with verified official source before production.
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </section>
        ) : null}

        <DisclaimerBanner />
      </div>
    </AppShell>
  );
}
