import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Currency Conversion API (using free data if possible, else fallback)
  app.get("/api/rates", async (req, res) => {
    try {
      // In a real app, you'd call a service like fixer.io or openexchangerates.org
      // For this demo, we'll return robust static rates that can be updated
      const rates = {
        INR: 1,
        USD: 0.012,
        GBP: 0.0094,
        EUR: 0.011,
      };
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });

  // Geolocation endpoint (proxying to a public service to avoid CORS or using req headers)
  app.get("/api/geo", async (req, res) => {
    try {
      // Cloud Run often provides location headers, but for the demo we'll use a public API
      // If we're behind a proxy, we might need to check X-Forwarded-For
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      res.json({ country: "IN", currency: "INR" }); // Defaulting for now, will enhance
    } catch (error) {
      res.status(500).json({ error: "Failed to detect location" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
