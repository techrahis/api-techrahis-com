const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const spotify = require("./spotify");

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    author: "rajarshi samaddar",
    message: "server running 🚀",
  });
});

app.get("/now-playing", async (req, res) => {
  const currentSong = await spotify.currentlyPlayingSong();
  const song = await currentSong.json();
  if (song.is_playing) {
    const data = {
      id: song.item.id,
      title: song.item.name,
      songUrl: song.item.external_urls.spotify,
      artists: song.item.artists.map((artist) => artist.name).join(", "),
      is_playing: song.is_playing,
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
    };
    res.status(200).json(data);
  } else {
    res.status(200).json({ is_playing: false });
  }
});

app.listen(3300);
