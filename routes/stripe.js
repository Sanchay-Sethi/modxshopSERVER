const router = require('express').Router();
const stripe = require('stripe')("sk_test_51JgrROSIjHxHGP78vMkYoQU4LSKImMFvBJ7yuVc4YnuIaxoA04cXoQwxFhNsHuIzzsKjFsTef2rbovxqMb3JHN4X00zCOmswi0");

//Stripe Payment request
router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });

module.exports = router;