// Photo click counter (Carlos, Aug 22 2026).
// POST /api/click  {photo, label}  -> adds one click for that photo
// GET  /api/click                  -> JSON list of all photos sorted by clicks
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore({ name: "photo-clicks", consistency: "strong" });

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch (e) { body = {}; }
    const photo = String(body.photo || "").replace(/[^a-zA-Z0-9_.\/-]/g, "").slice(0, 120);
    if (!photo.startsWith("photos/")) return new Response("bad request", { status: 400 });
    const cur = (await store.get(photo, { type: "json" })) || { count: 0 };
    cur.count = (cur.count || 0) + 1;
    cur.label = String(body.label || cur.label || "").slice(0, 60);
    cur.last  = new Date().toISOString();
    await store.setJSON(photo, cur);
    return new Response("ok", { status: 200 });
  }

  // DELETE /api/click?photo=...  -> removes a counter only if that photo file does not exist on the site (cleanup of junk keys)
  if (req.method === "DELETE") {
    const photo = String(new URL(req.url).searchParams.get("photo") || "").replace(/[^a-zA-Z0-9_.\/-]/g, "").slice(0, 120);
    if (!photo.startsWith("photos/")) return new Response("bad request", { status: 400 });
    const head = await fetch(new URL("/" + photo, req.url), { method: "HEAD" });
    if (head.ok) return new Response("refused: real photo", { status: 403 });
    await store.delete(photo);
    return new Response("deleted", { status: 200 });
  }

  const { blobs } = await store.list();
  const rows = [];
  for (const b of blobs) {
    const v = await store.get(b.key, { type: "json" });
    if (v) rows.push({ photo: b.key, count: v.count || 0, label: v.label || "", last: v.last || "" });
  }
  rows.sort((a, b) => b.count - a.count);
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/click" };
