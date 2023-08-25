const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors()); // for CORS poilicy
app.use(express.urlencoded({ extended: true })); // for accessing res body
app.set("view engine", "ejs"); // for rendering views

// root api route
app.get("/", (req, res) => {
  res.render("index");
});

// spotify router part
const spotifyRouter = require("./lib/spotify/router.js");
app.use("/spotify", spotifyRouter);

// newsletter router part
const newsletterRouter = require("./lib/newsletter/router.js");
app.use("/newsletter", newsletterRouter);

app.listen(3300);
