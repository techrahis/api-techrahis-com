const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

var corsOptions = {
  origin: function (origin, callback) {
    if (origin.endsWith(".fstackraj.com")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); //Handles JSON requests
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