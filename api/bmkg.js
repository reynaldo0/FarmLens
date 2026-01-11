export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    const adm4 = "31.71.01.1001"; // Jakarta Pusat - Gambir

    const response = await fetch(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`,
      {
        headers: {
          "User-Agent": "FarmLens-App",
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "BMKG fetch failed" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
