const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const resume = require("./resume");
    const myResume = await resume.getResume();
    if (myResume !== "404") {
        res.contentType("application/pdf");
        res.setHeader('Content-Disposition', 'attachment; filename=Rajarshi_Samaddar_Resume.pdf');
        res.status(200)
        res.send(myResume);
    } else {
        res.status(404).json({ status: 404, message: "Resume file not present on CDN" })
    }

});

module.exports = router;
