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

    const xmlFile = files.find(
      (file) => path.extname(file).toLowerCase() === ".xml"
    );

    if (!xmlFile) {
      res.status(404).send("No sitemap found");
      return;
    }

    res.type("application/xml");
    res.sendFile(path.join(__dirname, xmlFile));
  });
});

module.exports = router;
