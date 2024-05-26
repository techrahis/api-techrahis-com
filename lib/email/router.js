const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const router = express.Router();
const { saveSubmission } = require("./dbAccess");

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
    const saveSuccess = await saveSubmission(req.body);
    if (!saveSuccess) {
      res.redirect("https://www.fstackraj.com/p/error.html");
      return;
    }
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
  } else {
    res.redirect("https://www.fstackraj.com/p/error.html");
  }
});

function generateMailOptions(body, to, subject, futureDate) {
  return {
    from: '"Contact Form API" <no-reply@fstackraj.com>',
    to: to,
    subject: subject,
    html: `
      <p style="color: #F67938;">Hi, ${body.name}</p>
      <p style="color: #F67938;">Hope this message finds you well! </p>
      ${
        futureDate
          ? `<p style="color: #F67938;">Thank you for reaching out to me. I will get back to you by ${futureDate}.</p>`
          : ""
      }
      <p style="color: #F67938;">Here are the details you submitted:</p>
      <table style="width:100%; border:1px solid #F67938;">
        <tr style="background-color:#ffe0cc;">
          <th style="padding:10px; border:1px solid #F67938; color: #F67938;">Name</th>
          <td style="padding:10px; border:1px solid #F67938; color: #F67938;">${
            body.name
          }</td>
        </tr>
        <tr style="background-color:#fff2cc;">
          <th style="padding:10px; border:1px solid #F67938; color: #F67938;">Email</th>
          <td style="padding:10px; border:1px solid #F67938; color: #F67938;">${
            body.email
          }</td>
        </tr>
        <tr style="background-color:#fff2cc;">
          <th style="padding:10px; border:1px solid #F67938; color: #F67938;">Message</th>
          <td style="padding:10px; border:1px solid #F67938; color: #F67938;">${
            body.message
          }</td>
        </tr>
      </table>
      <p style="color: #F67938;">Regards,</p>
      <p style="color: #F67938;">Rajarshi Samaddar</p>
      <p><a href="https://fstackraj.com" style="color: #F67938;">www.fstackraj.com/</a></p>
    `,
  };
}

function sendMail(mailOptions, res) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.redirect("https://www.fstackraj.com/p/error.html");
    } else {
      res.redirect("https://www.fstackraj.com/p/thanks.html");
    }
  });
}

module.exports = router;
