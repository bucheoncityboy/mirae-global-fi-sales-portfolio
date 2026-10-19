import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = process.cwd();
const port = 4173;
const mime: Readonly<Record<string, string>> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
};
const publicFiles = new Set(["index.html", "styles.css", "assets/favicon.svg", "samples/2026-10-07.html"]);

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", `http://127.0.0.1:${port}`).pathname;
  let relative: string;
  try {
    relative = decodeURIComponent(pathname).replace(/^\/+/, "") || "index.html";
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const file = resolve(root, relative);
  if (!publicFiles.has(relative) || !file.startsWith(root + sep)) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const content = await readFile(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream", "Cache-Control": "no-store" }).end(content);
  } catch {
    response.writeHead(404).end("Not found");
  }
});
server.listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));
