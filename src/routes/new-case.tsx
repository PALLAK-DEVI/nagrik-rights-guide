import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/nagrik/app-shell";
import { DisclaimerBanner } from "@/components/nagrik/brand";
import { ProgressIndicator } from "@/components/nagrik/ui-bits";
import { CATEGORY_LABEL, DEMO_SCENARIOS, INDIAN_STATES } from "@/lib/nagrik/data";
import { analyzeCase, caseTitle } from "@/lib/nagrik/ai";
import { newId, useStore } from "@/lib/nagrik/store";
import type { Category, CaseRecord } from "@/lib/nagrik/types";

const searchSchema = z.object({
  demo: z.string().optional(),
  category: z.enum(["consumer", "tenant", "rti", "scheme"]).optional(),
});

export const Route = createFileRoute("/new-case")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Start a new case — NyayaSetu" },
      {
        name: "description",
        content:
          "Describe your civic or legal problem in plain language and NyayaSetu will identify the issue and suggest your next step.",
      },
      { property: "og:title", content: "Start a new case — NyayaSetu" },
      {
        property: "og:description",
        content: "Describe your problem in plain language and get a source-backed action plan.",
      },
    ],
  }),
  component: NewCase,
});

const LOADING_STEPS = [
  "Understanding your situation...",
  "Finding relevant information...",
  "Checking sources...",
  "Preparing your next steps...",
];

function NewCase() {
  const { demo, category: presetCategory } = Route.useSearch();
  const navigate = useNavigate();
  const { saveCase, cases, profile } = useStore();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "auto">(presetCategory ?? "auto");
  const [stateName, setStateName] = useState(profile?.state ?? "");
  const [district, setDistrict] = useState(profile?.district ?? "");
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!demo) return;
    const scenario = DEMO_SCENARIOS.find((d) => d.id === demo);
    if (!scenario) return;
    setDescription(scenario.text);
    setCategory(scenario.category);
    setStateName(scenario.state);
    toast.info(`Demo loaded: ${scenario.label}`);
  }, [demo]);

  useEffect(() => {
    if (step < 0 || step >= LOADING_STEPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 320);
    return () => clearTimeout(t);
  }, [step]);

  async function submit() {
    if (description.trim().length < 15) {
      toast.error("Please describe your situation in a little more detail.");
      return;
    }
    setStep(0);
    const analysis = await analyzeCase({
      description,
      category,
      state: stateName,
      district,
    });
    await new Promise((r) => setTimeout(r, 900));
    const id = newId();
    const record: CaseRecord = {
      id,
      ref: `CASE #${String(cases.length + 1).padStart(3, "0")}`,
      title: caseTitle(analysis.category, description),
      category: analysis.category,
      state: stateName,
      district,
      description,
      status: analysis.missing_information.length ? "needs_info" : "action_ready",
      analysis,
      answers: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveCase(record);
    toast.success("Analysis ready");
    navigate({ to: "/case/$id", params: { id } });
  }

  const busy = step >= 0;

  return (
    <AppShell title="New case" description="Describe your situation in your own words">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">Tell us what happened.</h2>
          <p className="mt-2 text-muted-foreground">
            You don&apos;t need to know the legal terms. Just explain the situation normally.
          </p>
        </div>

        <Card>
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="description">Your situation</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
                className="min-h-40 resize-y text-base"
                placeholder="For example: My landlord has not returned my ₹20,000 security deposit even though I moved out two months ago..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Issue type</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Category | "auto")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Not sure — let AI decide</SelectItem>
                    {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_LABEL[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Not sure which category? Leave it on &ldquo;let AI decide&rdquo;.
                </p>
              </div>

              <div className="space-y-2">
                <Label>State / Union Territory</Label>
                <Select value={stateName} onValueChange={setStateName}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your state" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">City / District (optional)</Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Guwahati"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={submit} disabled={busy} size="lg">
                <Wand2 className="size-4" /> Analyze My Situation
              </Button>
              <span className="text-sm text-muted-foreground">Takes a few seconds.</span>
            </div>

            {busy ? (
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <ProgressIndicator steps={LOADING_STEPS} current={Math.min(step, LOADING_STEPS.length - 1)} />
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4 text-primary" aria-hidden /> Try a demo scenario
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEMO_SCENARIOS.map((d) => (
                <Button
                  key={d.id}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setDescription(d.text);
                    setCategory(d.category);
                    setStateName(d.state);
                  }}
                >
                  {d.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <DisclaimerBanner />
      </div>
    </AppShell>
  );
}
