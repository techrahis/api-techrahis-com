const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const router = express.Router();
const juice = require("juice");
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
      `Message from ${req.body.name} on fstackraj.com.`,
      false
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
        true,
        futureDate
      );
      sendMail(mailOptionsCopy, res);
    }
  } else {
    res.redirect("https://www.fstackraj.com/p/error.html");
  }
});

function generateMailOptions(body, to, subject, isReceipt, futureDate) {
  let htmlBody = isReceipt
    ? generateReceiptBody(body, futureDate)
    : generateRegularBody(body);
  return {
    from: "<no-reply@fstackraj.com>",
    to: to,
    subject: subject,
    html: htmlBody,
  };
}

function generateReceiptBody(body, futureDate) {
  let html = `<style>
    .email-body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #000;  /* Black text color */
      margin: 20px;
    }
    .email-body h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .email-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #F67938; /* Orange table border */
      margin-bottom: 20px;
    }
    .email-table th,
    .email-table td {
      padding: 10px;
      border: 1px solid #F67938; /* Orange table cell border */
      text-align: left;
    }
    .email-table th {
      background-color: #F67938; /* Orange table header background */
      color: #FFF;  /* White text color for headers */
      font-weight: bold;
    }
    .important {
      font-weight: bold;
      color: #F67938; /* Orange for important text */
    }
  </style>
  <div class="email-body">
    <h2>Hi, ${body.name}</h2>
    <p>Hope this message finds you well! </p>
    ${
      futureDate
        ? `<p class="important">Thank you for reaching out to me. I will get back to you by ${futureDate}.</p>`
        : ""
    }
    <h2>Here are the details you submitted:</h2>
    <table class="email-table">
      <tr>
        <th>Name</th>
        <td>${body.name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${body.email}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>${body.message}</td>
      </tr>
    </table>
    <p>Regards,</p>
    <p class="important">Rajarshi Samaddar</p>
    <p><a href="https://fstackraj.com/" class="important">www.fstackraj.com</a></p>
  </div>
`;
  return juice(html);
}

function generateRegularBody(body) {
  let html = `<style>
    .email-body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #000;  /* Black text color */
      margin: 20px;
    }
    .email-body h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .email-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #F67938; /* Orange table border */
      margin-bottom: 20px;
    }
    .email-table th,
    .email-table td {
      padding: 10px;
      border: 1px solid #F67938; /* Orange table cell border */
      text-align: left;
    }
    .email-table th {
      background-color: #F67938; /* Orange table header background */
      color: #FFF;  /* White text color for headers */
      font-weight: bold;
    }
    .important {
      font-weight: bold;
      color: #F67938; /* Orange for important text */
    }
  </style>
  <div class="email-body">
    <h2>Hi, Rajarshi</h2>
    <p>Hope this message finds you well! </p>
    <h2>Here are the details submitted by the user:</h2>
    <table class="email-table">
      <tr>
        <th>Name</th>
        <td>${body.name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${body.email}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>${body.message}</td>
      </tr>
    </table>
    <p>Regards,</p>
    <p class="important">FSTACKRAJ API</p>
    <p><a href="https://fstackraj.com/" class="important">www.fstackraj.com</a></p>
  </div>
`;
  return juice(html);
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
