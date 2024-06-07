const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
      return;
    }

    const pdfFile = files.find(
      (file) => path.extname(file).toLowerCase() === ".pdf"
    );

    if (!pdfFile) {
      res.status(404).send("No Resume file found");
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(path.join(__dirname, pdfFile));
  });
});

module.exports = router;
