import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/nyayasetu-logo.png.asset.json";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={logoAsset.url}
        alt="NyayaSetu logo"
        className="size-9 shrink-0 rounded-lg object-contain"
        width={36}
        height={36}
      />
      <span className={cn("text-lg font-semibold tracking-tight", invert && "text-sidebar-foreground")}>
        Nyaya<span className="text-primary">Setu</span>
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
