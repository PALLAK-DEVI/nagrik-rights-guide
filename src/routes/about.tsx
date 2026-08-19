import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteNav } from "@/components/nagrik/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NagrikAI — civic and legal information, made usable" },
      {
        name: "description",
        content:
          "Why NagrikAI exists, how its source-backed AI works, and the privacy, terms and disclaimer that govern its use.",
      },
      { property: "og:title", content: "About NagrikAI" },
      {
        property: "og:description",
        content: "Source-backed civic and legal guidance for Indian citizens — how it works and its limits.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="container-page max-w-3xl py-14">
        <h1 className="text-3xl font-semibold sm:text-4xl">About NagrikAI</h1>
        <p className="mt-4 text-muted-foreground">
          Most people in India do not lose civic disputes because they are wrong. They lose because
          the information is scattered, the language is intimidating, and nobody tells them what to
          do next. NagrikAI exists to close that gap.
        </p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">How it works</h2>
          <p className="text-muted-foreground">
            NagrikAI is built as a retrieval-augmented system, not a chatbot. A described problem is
            classified, structured facts are extracted, missing information is identified, relevant
            documents are retrieved and ranked, and only then is a grounded explanation produced —
            with citations, an action plan and a generated document.
          </p>
          <p className="text-muted-foreground">
            The AI layer returns structured JSON (category, summary, facts, missing information,
            potential rights, action steps, sources, confidence, disclaimer) so the interface can be
            honest about what is known and what is not.
          </p>
        </section>

        <section id="privacy" className="mt-10 scroll-mt-24 space-y-3">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="text-muted-foreground">
            In this build, your cases, documents and profile are stored locally in your browser. No
            personal data is transmitted to a third party. You can delete everything at any time
            from the Profile page.
          </p>
        </section>

        <section id="terms" className="mt-10 scroll-mt-24 space-y-3">
          <h2 className="text-xl font-semibold">Terms</h2>
          <p className="text-muted-foreground">
            NagrikAI is provided as an informational tool. You are responsible for verifying any
            authority, deadline or document before acting on it. Demo records are clearly labelled
            and must not be treated as official sources.
          </p>
        </section>

        <section id="disclaimer" className="mt-10 scroll-mt-24 space-y-3">
          <h2 className="text-xl font-semibold">Disclaimer</h2>
          <p className="text-muted-foreground">
            NagrikAI provides informational assistance and does not provide legal representation or
            professional legal advice. For binding advice on your situation, consult a qualified
            lawyer or the relevant authority.
          </p>
        </section>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/new-case">Start your case</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
