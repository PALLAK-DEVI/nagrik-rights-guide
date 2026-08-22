import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./brand";

const LINKS = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/", label: "How it works", hash: "how-it-works" },
  { to: "/sources", label: "Rights", hash: undefined },
  { to: "/cases", label: "My Cases", hash: undefined },
  { to: "/about", label: "About", hash: undefined },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-6">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="mt-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild variant="outline" onClick={() => setOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.5fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Understand your rights. Know your next step.
          </p>
          <p className="mt-4 max-w-md text-xs text-muted-foreground">
            NyayaSetu provides informational assistance and does not provide legal representation or
            professional legal advice.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Product</span>
            <Link to="/sources" className="text-muted-foreground hover:text-foreground">
              Sources
            </Link>
            <Link to="/new-case" className="text-muted-foreground hover:text-foreground">
              Start a case
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Legal</span>
            <Link to="/about" hash="privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/about" hash="terms" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/about" hash="disclaimer" className="text-muted-foreground hover:text-foreground">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="container-page text-xs text-muted-foreground">
          © {new Date().getFullYear()} NyayaSetu · Making India's civic and legal information simple,
          reliable and actionable.
        </p>
      </div>
    </footer>
  );
}
