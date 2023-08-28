const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const getMovies = require("./recent-movies");
  const data = await getMovies.getRecentMovies();
  res.send(data);
});

module.exports = router;
