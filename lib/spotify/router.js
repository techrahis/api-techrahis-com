const express = require("express");
const router = express.Router();
const spotify = require("./spotify");

router.get("/now-playing", async (req, res) => {
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

router.get("/top-tracks", async (req, res) => {
  const topTracks = await spotify.getTopTracks();
  const { items } = await topTracks.json();
  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    albumArt: track.album.images[0].url,
  }));
  res.status(200).json(tracks);
});

router.get("/top-artists", async (req, res) => {
  const topArtists = await spotify.getTopArtists();
  const items = await topArtists;
  const artists = items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    url: artist.external_urls.spotify,
    popularity: artist.popularity,
    coverImage: artist.images ? artist.images[1] : null,
  }));
  res.status(200).json(artists);
});

module.exports = router;
