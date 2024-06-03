const express = require("express");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const subscribe = require("./newsletter");
  const saveSuccess = await subscribe.subscribeNewsLetter(req.body.email);
  if (!saveSuccess) {
    res.status(500).json({ message: "You are already subscribed." });
    return;
  }
  res.status(200).json({ message: "You have successfully subscribed." });
});

module.exports = router;
