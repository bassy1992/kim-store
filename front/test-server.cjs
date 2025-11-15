const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test server is working!', timestamp: new Date().toISOString() });
});

// Paystack initialize route
app.post('/api/paystack/initialize', async (req, res) => {
  try {
    const { email, amount, metadata } = req.body;

    const secret = process.env.PAYSTACK_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "PAYSTACK_SECRET not configured on server" });
    }

    if (!email || !amount) {
      return res.status(400).json({ error: "Missing email or amount" });
    }

    console.log('Initializing Paystack payment:', { email, amount, metadata });

    // Paystack expects amount in the smallest currency unit (e.g. pesewas for GHS or kobo for NGN)
    const initBody = {
      email,
      amount: Number(amount),
      currency: req.body.currency || "GHS",
      metadata: metadata || {},
      callback_url: req.body.callback_url || `http://localhost:8080/success`,
    };

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initBody),
    });

    const data = await response.json();
    
    console.log('Paystack response:', data);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || data });
    }

    // Return Paystack response (authorization_url and reference)
    return res.json(data);
  } catch (error) {
    console.error("Paystack init error", error);
    return res.status(500).json({ error: error.message || String(error) });
  }
});

// Paystack verify route
app.get('/api/paystack/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    const secret = process.env.PAYSTACK_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "PAYSTACK_SECRET not configured on server" });
    }

    if (!reference) {
      return res.status(400).json({ error: "Missing payment reference" });
    }

    console.log('Verifying payment:', reference);

    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
    });

    const verifyData = await verifyResponse.json();
    
    console.log('Paystack verification response:', verifyData);
    
    if (!verifyResponse.ok) {
      return res.status(verifyResponse.status).json({ error: verifyData.message || verifyData });
    }

    // Check if payment was successful
    if (verifyData.data && verifyData.data.status === 'success') {
      // Payment successful - you would create order in Django backend here
      console.log('Payment successful!', verifyData.data);
      
      return res.json({ 
        status: 'success', 
        message: 'Payment verified successfully',
        payment: verifyData.data 
      });
    } else {
      return res.json({ 
        status: 'failed', 
        message: 'Payment verification failed',
        payment: verifyData.data 
      });
    }

  } catch (error) {
    console.error("Paystack verify error", error);
    return res.status(500).json({ error: error.message || String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📡 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`💳 Paystack init: http://localhost:${PORT}/api/paystack/initialize`);
  console.log(`✅ Paystack verify: http://localhost:${PORT}/api/paystack/verify/:reference`);
});