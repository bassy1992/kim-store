import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/demo", handleDemo);

  // Paystack routes
  try {
    const { handlePaystackInit, handlePaystackVerify } = await import("./routes/paystack");
    app.post("/paystack/initialize", handlePaystackInit);
    app.get("/paystack/verify/:reference", handlePaystackVerify);
    console.log("✅ Paystack routes loaded successfully");
  } catch (e) {
    console.warn("❌ Paystack routes not loaded:", e);
  }

  return app;
}
