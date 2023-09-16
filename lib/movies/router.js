const express = require("express");
const router = express.Router();

router.get("/recent-movies", async (req, res) => {
  const getMovies = require("./recent-movies");
  const data = (await getMovies.getRecentMovies()).documents;

  const movies = data.map((movie) => ({
    id: movie.id,
    name: movie.name,
    image: movie.image,
    url: movie.url,
    year: movie.year,
    rating: movie.rating,
    status: movie.status,
  }));

  res.status(200).json(movies);
});

module.exports = router;
