const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  secure: false,
  port: 587,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const months = [
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

router.post("/", async (req, res) => {
  if (validator.validate(req.body.email)) {
    const mailOptions = generateMailOptions(
      req.body,
      "me@fstackraj.com",
      `Message from ${req.body.name} on fstackraj.com.`
    );
    sendMail(mailOptions, res);

    if (req.body.receipt) {
      let date = new Date();
      date.setDate(date.getDate() + 2);
      let futureDate = `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
      const mailOptionsCopy = generateMailOptions(
        req.body,
        req.body.email,
        "🎉 Form Submission Confirmed - Your Details Recorded!",
        futureDate
      );
      sendMail(mailOptionsCopy, res);
    }
  } else res.status(400).send("Invalid email ❌");
});

function generateMailOptions(body, to, subject, futureDate) {
  return {
    from: '"Contact Form API" <no-reply@fstackraj.com>',
    to: to,
    subject: subject,
    html: `
      <p style="color: #003366;">Hi, ${body.name}</p>
      <p style="color: #003366;">Hope this message finds you well! 🌟</p>
      ${
        futureDate
          ? `<p style="color: #003366;">Thank you for reaching out to me. I will get back to you by ${futureDate}.</p>`
          : ""
      }
      <p style="color: #003366;">Here are the details you submitted:</p>
      <table style="width:100%; border:1px solid #003366;">
          <tr style="background-color:#99ccff;">
              <th style="padding:10px; border:1px solid #003366; color: #003366;">Name</th>
              <td style="padding:10px; border:1px solid #003366; color: #003366;">${
                body.name
              }</td>
          </tr>
          <tr style="background-color:#cce6ff;">
              <th style="padding:10px; border:1px solid #003366; color: #003366;">Email</th>
              <td style="padding:10px; border:1px solid #003366; color: #003366;">${
                body.email
              }</td>
          </tr>
          <tr style="background-color:#cce6ff;">
              <th style="padding:10px; border:1px solid #003366; color: #003366;">Message</th>
              <td style="padding:10px; border:1px solid #003366; color: #003366;">${
                body.message
              }</td>
          </tr>
      </table>
      <p style="color: #003366;">Regards,</p>
      <p style="color: #003366;">Rajarshi Samaddar</p>
      <p><a href="https://fstackraj.com" style="color: #003366;">www.fstackraj.com/</a></p>
    `,
  };
}

function sendMail(mailOptions, res) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.redirect("https://www.fstackraj.com");
    } else {
      res.redirect("https://www.fstackraj.com/p/thanks.html");
    }
  });
}

module.exports = router;
