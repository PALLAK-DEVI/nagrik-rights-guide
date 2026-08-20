import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Eye, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppShell } from "@/components/nagrik/app-shell";
import { DocumentPreview, EmptyState } from "@/components/nagrik/ui-bits";
import { downloadDocument } from "@/lib/nagrik/download";
import { useStore } from "@/lib/nagrik/store";
import type { DocumentRecord } from "@/lib/nagrik/types";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "My documents — NagrikAI" },
      {
        name: "description",
        content: "View, download and manage the letters and applications NagrikAI generated for you.",
      },
      { property: "og:title", content: "My documents — NagrikAI" },
      { property: "og:description", content: "Your generated letters, notices and RTI applications." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { documents, deleteDocument } = useStore();
  const [open, setOpen] = useState<DocumentRecord | null>(null);

  return (
    <AppShell title="Documents" description="Letters and applications you've generated">
      <div className="mx-auto max-w-5xl space-y-6">
        {documents.length === 0 ? (
          <EmptyState
            icon={<FileText className="size-5" />}
            title="No documents yet"
            description="Generate a request letter or RTI application from a case and it will be saved here."
            action={
              <Button asChild>
                <Link to="/new-case">Start a case</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {documents.map((d) => (
              <Card key={d.id}>
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="size-4.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {d.type} · {new Date(d.createdAt).toLocaleDateString("en-IN")}
                      </p>
                      {d.caseTitle ? (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          Related case: {d.caseTitle}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => setOpen(d)}>
                      <Eye className="size-4" /> View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => downloadDocument(d.name, d.content)}>
                      <Download className="size-4" /> Download
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        deleteDocument(d.id);
                        toast.success("Document deleted");
                      }}
                    >
                      <Trash2 className="size-4" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{open?.name}</DialogTitle>
          </DialogHeader>
          {open ? <DocumentPreview content={open.content} /> : null}
          {open ? (
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => downloadDocument(open.name, open.content)}>
                <Download className="size-4" /> Download
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(open.content);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
