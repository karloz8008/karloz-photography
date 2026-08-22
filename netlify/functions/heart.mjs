// Photo heart counter (Carlos, Aug 22 2026).
// POST /api/heart  {photo, label, delta}  -> +1 or -1 heart for that photo
// GET  /api/heart?photo=photos/x.jpg       -> {count} for one photo
// GET  /api/heart                          -> JSON list of all photos sorted by hearts
import { getStore } from "@netlify/blobs";

const clean = (p) => String(p || "").replace(/[^a-zA-Z0-9_.\/-]/g, "").slice(0, 120);
const json  = (data) => new Response(JSON.stringify(data), {
  status: 200,
  headers: { "content-type": "application/json", "cache-control": "no-store" }
});

export default async (req) => {
  const store = getStore({ name: "photo-hearts", consistency: "strong" });

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch (e) { body = {}; }
    const photo = clean(body.photo);
    if (!photo.startsWith("photos/")) return new Response("bad request", { status: 400 });
    const delta = Number(body.delta) === -1 ? -1 : 1;
    const cur = (await store.get(photo, { type: "json" })) || { count: 0 };
    cur.count = Math.max(0, (cur.count || 0) + delta);
    cur.label = String(body.label || cur.label || "").slice(0, 60);
    cur.last  = new Date().toISOString();
    await store.setJSON(photo, cur);
    return json({ count: cur.count });
  }

  const one = clean(new URL(req.url).searchParams.get("photo"));
  if (one) {
    const v = await store.get(one, { type: "json" });
    return json({ count: (v && v.count) || 0 });
  }

  const { blobs } = await store.list();
  const rows = [];
  for (const b of blobs) {
    const v = await store.get(b.key, { type: "json" });
    if (v) rows.push({ photo: b.key, count: v.count || 0, label: v.label || "", last: v.last || "" });
  }
  rows.sort((a, b) => b.count - a.count);
  return json(rows);
};

export const config = { path: "/api/heart" };
