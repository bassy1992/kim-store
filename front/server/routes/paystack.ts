import { RequestHandler } from "express";

export const handlePaystackInit: RequestHandler = async (req, res) => {
  try {
    const { email, amount, metadata } = req.body;

    const secret = process.env.PAYSTACK_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "PAYSTACK_SECRET not configured on server" });
    }

    if (!email || !amount) {
      return res.status(400).json({ error: "Missing email or amount" });
    }

    // Paystack expects amount in the smallest currency unit (e.g. pesewas for GHS or kobo for NGN)
    const initBody = {
      email,
      amount: Number(amount),
      currency: req.body.currency || "GHS",
      metadata: metadata || {},
      callback_url: req.body.callback_url || `${process.env.APP_URL || "http://localhost:8080"}/success`,
    };

    const r = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initBody),
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: data.message || data });
    }

    // Return Paystack response (authorization_url and reference)
    return res.json(data);
  } catch (error: any) {
    console.error("Paystack init error", error);
    return res.status(500).json({ error: error.message || String(error) });
  }
};
