/** Opens a print-to-PDF window with the document, and falls back to a text download. */
export function downloadDocument(name: string, content: string) {
  if (typeof window === "undefined") return;
  const win = window.open("", "_blank", "width=820,height=900");
  if (!win) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/[^\w\-]+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }
  const esc = content.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
  win.document.write(`<!doctype html><html><head><title>${name}</title>
<style>body{font-family:Inter,system-ui,sans-serif;line-height:1.6;padding:48px;max-width:760px;margin:auto;white-space:pre-wrap;font-size:14px;color:#1a2233}</style>
</head><body>${esc}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}
