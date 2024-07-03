const express = require("express");
const { handleWebhook, convertPointsToSubscription } = require("../controllers/paymentController");
const router = express.Router();

router.post("/webhook", express.raw({ type: 'application/json' }), handleWebhook);
router.patch("/convert", convertPointsToSubscription)
module.exports = router;
