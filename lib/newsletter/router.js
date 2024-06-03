const express = require("express");
const router = express.Router();
const emailValidator = require("email-validator");

router.post("/subscribe", async (req, res) => {
  if (!emailValidator.validate(req.body.email)) {
    res.status(400).json({ message: "Invalid email." });
    return;
  }
  const subscribe = require("./newsletter");
  const saveSuccess = await subscribe.subscribeNewsLetter(req.body.email);
  if (!saveSuccess) {
    res.status(500).json({ message: "You are already subscribed." });
    return;
  }
  res.status(200).json({ message: "You have successfully subscribed." });
});

module.exports = router;
