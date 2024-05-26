const express = require("express");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const subscribe = require("./newsletter");
  const saveSuccess = await subscribe.subscribeNewsLetter(req.body.email);
  if (!saveSuccess) {
    res.redirect("https://www.fstackraj.com/p/error.html");
    return;
  }
  res.redirect("https://www.fstackraj.com/p/thanks.html");
});

module.exports = router;
