const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const email_password = process.env.GMAIL_PASSWORD;

router.post("/", async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.rajarshisamaddar.com@gmail.com',
            pass: email_password
        }
    });

    const mailOptions = {
        from: 'noreply.rajarshisamaddar',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).send("Email was not sent ❌");
        } else {
            res.status(200).send("Email send successfully ✅");
        }
    });
});

module.exports = router;
