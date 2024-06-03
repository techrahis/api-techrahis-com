const express = require("express");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const subscribe = require("./newsletter");
  const saveSuccess = await subscribe.subscribeNewsLetter(req.body.email);
  if (!saveSuccess) {
    res.status(500).send("Failed to subscribe to newsletter.");
    return;
  }
  res.status(200).send("Subscribed to newsletter.");
});

module.exports = router;
