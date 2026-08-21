import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
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
import { INDIAN_STATES } from "@/lib/nagrik/data";
import { useStore } from "@/lib/nagrik/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — NagrikAI" },
      { name: "description", content: "Manage your name, state, district, language preference and privacy." },
      { property: "og:title", content: "Your profile — NagrikAI" },
      { property: "og:description", content: "Manage your details, language preference and privacy settings." },
    ],
  }),
  component: ProfilePage,
});

const LANGUAGES = ["English", "हिन्दी (Hindi)", "অসমীয়া (Assamese)", "বাংলা (Bengali)", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "मराठी (Marathi)"];

function ProfilePage() {
  const { profile, updateProfile, signIn, reset, ready } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", state: "", district: "", language: "English" });

  useEffect(() => {
    if (!ready) return;
    setForm({
      name: profile?.name ?? "",
      email: profile?.email ?? "",
      state: profile?.state ?? "",
      district: profile?.district ?? "",
      language: profile?.language ?? "English",
    });
  }, [ready, profile]);

  return (
    <AppShell title="Profile" description="Your details and privacy">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardContent className="space-y-4 p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Your details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
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
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Preferred language</Label>
                <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The interface is currently English-only; your preference is saved for upcoming
                  multilingual support.
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                if (!form.name || !form.email) {
                  toast.error("Name and email are required.");
                  return;
                }
                if (profile) updateProfile(form);
                else signIn(form);
                toast.success("Profile saved");
              }}
            >
              Save changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Privacy</h2>
            <p className="text-sm text-muted-foreground">
              Your cases, answers and generated documents are stored locally in this browser. Nothing
              is shared with a third party in this build.
            </p>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                reset();
                toast.success("All local data deleted");
                navigate({ to: "/" });
              }}
            >
              Delete account &amp; all data
            </Button>
          </CardContent>
        </Card>

        <DisclaimerBanner />
      </div>
    </AppShell>
  );
}
