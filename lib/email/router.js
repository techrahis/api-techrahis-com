const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const email_password = process.env.GMAIL_PASSWORD;

router.post("/", async (req, res) => {

    const validator = require("email-validator");

    if (validator.validate(req.body.email)) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.rajarshisamaddar.com@gmail.com',
                pass: email_password
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: "hello@rajarshisamaddar.com",
            subject: req.body.subject,
            text: req.body.message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(400).send("Email was not sent ❌");
            } else {
                res.status(200).send("Email send successfully ✅");
            }
        });

        if (req.body.receipt) {
            const mailOptionsCopy = {
                from: "noreply.rajarshisamaddar.com@gmail.com",
                to: req.body.email,
                subject: "Copy of your message from www.rajarshisamaddar.com.",
                text: req.body.message
            };
            transporter.sendMail(mailOptionsCopy);
        }

    }
    else res.status(400).send("Invalid email ❌");

});

module.exports = router;
