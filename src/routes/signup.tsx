import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DisclaimerBanner, Logo } from "@/components/nagrik/brand";
import { INDIAN_STATES } from "@/lib/nagrik/data";
import { useStore } from "@/lib/nagrik/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — NyayaSetu" },
      {
        name: "description",
        content: "Create a free NyayaSetu account to save cases, documents and action plans.",
      },
      { property: "og:title", content: "Create your account — NyayaSetu" },
      { property: "og:description", content: "Save your civic cases, documents and action plans." },
    ],
  }),
  component: SignupPage,
});

const LANGUAGES = ["English", "हिन्दी (Hindi)", "অসমীয়া (Assamese)", "বাংলা (Bengali)", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "मराठी (Marathi)"];

function SignupPage() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateName, setStateName] = useState("");
  const [language, setLanguage] = useState("English");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Save your cases, documents and action plans.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name || !email || !password) {
                toast.error("Please fill in your name, email and password.");
                return;
              }
              signIn({ name, email, state: stateName, language });
              toast.success("Account created");
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
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
            <div className="space-y-2">
              <Label>Preferred language (optional)</Label>
              <Select value={language} onValueChange={setLanguage}>
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
                Interface is currently in English. More languages are planned.
              </p>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
          <DisclaimerBanner className="mt-6" />
        </div>
      </div>

      <div className="hidden flex-col justify-center bg-sidebar px-12 text-sidebar-foreground lg:flex">
        <h2 className="text-3xl font-semibold">Understand your rights.</h2>
        <p className="mt-2 text-xl text-sidebar-foreground/80">Know your next step.</p>
        <ul className="mt-8 space-y-3 text-sidebar-foreground/80">
          <li>• Plain-language explanations, no legal jargon</li>
          <li>• Every answer shows the sources behind it</li>
          <li>• Ready-to-send documents and applications</li>
        </ul>
      </div>
    </div>
  );
}
