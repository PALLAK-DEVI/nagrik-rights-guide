import { Link } from "@tanstack/react-router";
import { Scale, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg",
          invert ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <ShieldCheck className="size-4.5" aria-hidden />
      </span>
      <span className={cn("text-lg font-semibold tracking-tight", invert && "text-sidebar-foreground")}>
        Nagrik<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}

export function DisclaimerBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <Scale className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <p>Informational assistance only — not legal advice. NyayaSetu does not provide legal representation.</p>
    </div>
  );
}
