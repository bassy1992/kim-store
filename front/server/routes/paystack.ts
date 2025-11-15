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

export const handlePaystackVerify: RequestHandler = async (req, res) => {
  try {
    const { reference } = req.params;
    
    const secret = process.env.PAYSTACK_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "PAYSTACK_SECRET not configured on server" });
    }

    if (!reference) {
      return res.status(400).json({ error: "Missing payment reference" });
    }

    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
    });

    const verifyData = await verifyResponse.json();
    
    if (!verifyResponse.ok) {
      return res.status(verifyResponse.status).json({ error: verifyData.message || verifyData });
    }

    // Check if payment was successful
    if (verifyData.data && verifyData.data.status === 'success') {
      // Payment successful - create order in Django backend
      const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';
      const metadata = verifyData.data.metadata;
      
      const orderData = {
        email: verifyData.data.customer.email,
        full_name: metadata.full_name,
        shipping_address: metadata.shipping_address,
        phone: metadata.phone,
        payment_reference: reference,
        payment_status: 'completed',
        total_amount: verifyData.data.amount / 100, // Convert from pesewas to cedis
      };

      console.log('Creating order after successful payment:', orderData);

      const orderResponse = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (orderResponse.ok) {
        const order = await orderResponse.json();
        return res.json({ 
          status: 'success', 
          message: 'Payment verified and order created',
          order,
          payment: verifyData.data 
        });
      } else {
        console.error('Failed to create order after payment');
        return res.json({ 
          status: 'success', 
          message: 'Payment verified but order creation failed',
          payment: verifyData.data 
        });
      }
    } else {
      return res.json({ 
        status: 'failed', 
        message: 'Payment verification failed',
        payment: verifyData.data 
      });
    }

  } catch (error: any) {
    console.error("Paystack verify error", error);
    return res.status(500).json({ error: error.message || String(error) });
  }
};
