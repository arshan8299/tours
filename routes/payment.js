const express = require('express');
const router = express.Router();

require('dotenv').config();
const stripe = require('stripe')('sk_test_51O8fNeSBhIZ5Uuqek5H4b6ULq0c7uhIty4sJTZVZ52Bhn0x8HjwhL2vxrYzVluMRVPZLjKNoBj2o4JjqZzrXBoqv00gFuk8Ofk');

router.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: 'http://localhost:5173/Success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

module.exports = router;

