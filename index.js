const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors()); // for CORS poilicy
app.use(express.urlencoded({ extended: true })); // for accessing res body

// root api route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "200 OK",
    route: "api.rajarshisamaddar.com",
    message: "Server is running at an unstoppable speed 🚀",
  });
});

// spotify router part
const spotifyRouter = require("./lib/spotify/router.js");
app.use("/spotify", spotifyRouter);

// newsletter router part
const newsletterRouter = require("./lib/newsletter/router.js");
app.use("/newsletter", newsletterRouter);

// to get the data of recent watched movies and tv series
const recentMovies = require("./lib/movies/router.js");
app.use("/recent-movies", recentMovies);

app.listen(3300);
