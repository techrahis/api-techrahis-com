const express = require("express");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  console.log(req.body.email);
  const subscribe = require("./newsletter");
  await subscribe.subscribeNewsLetter(req.body.email);
  res.status(200).send("You are added to the newsletter ✅");
});

module.exports = router;
