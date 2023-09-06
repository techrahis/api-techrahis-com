const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const resume = require("./resume");
    const myResume = await resume.getResume();
    res.contentType("application/pdf");
    res.setHeader('Content-Disposition', 'attachment; filename=Rajarshi_Samaddar_Resume.pdf');
    res.status(200)
    res.send(myResume);
});

module.exports = router;
