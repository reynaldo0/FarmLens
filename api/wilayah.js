// api/wilayah.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const path = String(req.query.path || "").trim();

    // Healthcheck kalau tidak kirim path
    if (!path) {
      return res.status(200).json({
        status: "ok",
        message: "Wilayah Proxy API is running 🚀",
        examples: [
          "/api/wilayah?path=provinces.json",
          "/api/wilayah?path=regencies/32.json",
          "/api/wilayah?path=districts/31.74.json",
          "/api/wilayah?path=villages/31.74.09.json",
        ],
      });
    }

    // whitelist biar aman
    const allowed =
      path === "provinces.json" ||
      path.startsWith("regencies/") ||
      path.startsWith("districts/") ||
      path.startsWith("villages/");

    if (!allowed) {
      return res.status(400).json({
        error: "Invalid path",
        allowed: [
          "provinces.json",
          "regencies/{provinceCode}.json",
          "districts/{regencyCode}.json",
          "villages/{districtCode}.json",
        ],
      });
    }

    const upstream = `https://wilayah.id/api/${path}`;

    const response = await fetch(upstream, {
      headers: {
        "User-Agent": "FarmLens-App",
      },
    });

    if (!response.ok) {
      return res.status(500).json({
        error: "Wilayah fetch failed",
        status: response.status,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
