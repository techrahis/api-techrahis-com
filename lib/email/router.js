const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const email_password = process.env.GMAIL_PASSWORD;

router.post("/", async (req, res) => {
  const validator = require("email-validator");

  if (validator.validate(req.body.email)) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.rajarshisamaddar.com@gmail.com",
        pass: email_password,
      },
    });

    const mailOptions = {
      from: '"Contact Form API" <noreply.rajarshisamaddar.com@gmail.com>',
      to: "hello@rajarshisamaddar.com",
      subject: `Message from ${req.body.name} on r4u.`,
      html: `
            <p style="color: #003366;">Hi, Rajarshi</p>
            <p style="color: #003366;">Hope this message finds you well! 🌟</p>
            <p style="color: #003366;">Here are the details you got:</p>
            <table style="width:100%; border:1px solid #003366;">
                <tr style="background-color:#99ccff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Name</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.name}</td>
                </tr>
                <tr style="background-color:#cce6ff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Email</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.email}</td>
                </tr>
                <tr style="background-color:#99ccff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Subject</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.subject}</td>
                </tr>
                <tr style="background-color:#cce6ff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Message</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.message}</td>
                </tr>
            </table>
            <p style="color: #003366;">Regards,</p>
            <p style="color: #003366;">Contact Form API</p>
            <p><a href="https://rajarshisamaddar.com/" style="color: #003366;">www.rajarshisamaddar.com/</a></p>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).send("Email was not sent ❌");
      } else {
        res.status(200).send("Email send successfully ✅");
      }
    });

    if (req.body.receipt) {
      let date = new Date();
      date.setDate(date.getDate() + 2);
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let futureDate = `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;

      const mailOptionsCopy = {
        from: '"Rajarshi Samaddar" <noreply.rajarshisamaddar.com@gmail.com>',
        to: req.body.email,
        subject: "🎉 Form Submission Confirmed - Your Details Recorded!",
        html: `
            <p style="color: #003366;">Hi, ${req.body.name}</p>
            <p style="color: #003366;">Hope this message finds you well! 🌟</p>
            <p style="color: #003366;">Thank you for reaching out to me. I will get back to you by ${futureDate}.</p>
            <p style="color: #003366;">Here are the details you submitted:</p>
            <table style="width:100%; border:1px solid #003366;">
                <tr style="background-color:#99ccff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Name</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.name}</td>
                </tr>
                <tr style="background-color:#cce6ff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Email</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.email}</td>
                </tr>
                <tr style="background-color:#99ccff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Subject</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.subject}</td>
                </tr>
                <tr style="background-color:#cce6ff;">
                    <th style="padding:10px; border:1px solid #003366; color: #003366;">Message</th>
                    <td style="padding:10px; border:1px solid #003366; color: #003366;">${req.body.message}</td>
                </tr>
            </table>
            <p style="color: #003366;">Regards,</p>
            <p style="color: #003366;">Rajarshi Samaddar</p>
            <p><a href="https://rajarshisamaddar.com/" style="color: #003366;">www.rajarshisamaddar.com/</a></p>
        `,
      };
      transporter.sendMail(mailOptionsCopy);
    }
  } else res.status(400).send("Invalid email ❌");
});

module.exports = router;
