// IArtist download counter (Carlos, Sep 6 2026). Numbers only, no names, no personal data.
// POST /api/iartist {kind}   kind = page | download | phone  -> adds one for today and for the total
// GET  /api/iartist          -> JSON { totals: {page, download, phone}, days: [{day, page, download, phone}] }
import { getStore } from "@netlify/blobs";

const KINDS = ["page", "download", "phone"];

export default async (req) => {
  const store = getStore({ name: "iartist-downloads", consistency: "strong" });

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch (e) { body = {}; }
    const kind = String(body.kind || "");
    if (!KINDS.includes(kind)) return new Response("bad request", { status: 400 });
    const day = new Date().toISOString().slice(0, 10);
    const bump = async (key) => {
      const cur = (await store.get(key, { type: "json" })) || {};
      cur[kind] = (cur[kind] || 0) + 1;
      cur.last = new Date().toISOString();
      await store.setJSON(key, cur);
    };
    await bump("total");
    await bump("day:" + day);
    return new Response("ok", { status: 200 });
  }

  const totals = (await store.get("total", { type: "json" })) || {};
  const { blobs } = await store.list({ prefix: "day:" });
  const days = [];
  for (const b of blobs) {
    const v = (await store.get(b.key, { type: "json" })) || {};
    days.push({ day: b.key.slice(4), page: v.page || 0, download: v.download || 0, phone: v.phone || 0 });
  }
  days.sort((a, b) => b.day.localeCompare(a.day));
  const out = { totals: { page: totals.page || 0, download: totals.download || 0, phone: totals.phone || 0 }, days };
  return new Response(JSON.stringify(out), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/iartist" };
