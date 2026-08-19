import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo, DisclaimerBanner } from "@/components/nagrik/brand";
import { useStore } from "@/lib/nagrik/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — NagrikAI" },
      { name: "description", content: "Log in to NagrikAI to continue your civic and legal cases." },
      { property: "og:title", content: "Log in — NagrikAI" },
      { property: "og:description", content: "Continue your cases, documents and action plans." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, profile } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState(profile?.email ?? "");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Log in to continue your cases and documents.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email || !password) {
                toast.error("Please enter your email and password.");
                return;
              }
              signIn({ name: profile?.name ?? email.split("@")[0], email, state: profile?.state });
              toast.success("Logged in");
              navigate({ to: "/dashboard" });
            }}
          >
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
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox defaultChecked /> Remember me
              </label>
              <button
                type="button"
                onClick={() => toast.info("Password reset will be available once accounts are connected.")}
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            New to NagrikAI?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Demo authentication — accounts are stored locally on this device.
          </p>
          <DisclaimerBanner className="mt-6" />
        </div>
      </div>

      <div className="hidden flex-col justify-center bg-sidebar px-12 text-sidebar-foreground lg:flex">
        <Card className="border-none bg-sidebar-accent/40 text-sidebar-foreground shadow-none">
          <CardContent className="p-8">
            <p className="text-sm text-sidebar-foreground/70">Your rights shouldn&apos;t require</p>
            <h2 className="mt-1 text-3xl font-semibold">a law degree.</h2>
            <p className="mt-4 max-w-md text-sidebar-foreground/80">
              Source-backed explanations, personalized action plans and ready-to-use documents for
              everyday civic problems in India.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
