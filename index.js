const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors()); // for CORS policy
app.use(express.json()); // for accessing req body
app.use(express.urlencoded({ extended: true })); // for accessing res body

// root api route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "200 OK",
    route: "api.fstackraj.com",
    message: "Server is running at an unstoppable speed 🚀",
  });
});

// newsletter router part
const newsletterRouter = require("./lib/newsletter/router.js");
app.use("/newsletter", newsletterRouter);

// to send email notification
const emailRouter = require("./lib/email/router.js");
app.use("/send-email", emailRouter);

// get resume
const resumeRouter = require("./lib/resume/router.js");
app.use("/resume", resumeRouter);

app.listen(3300);
