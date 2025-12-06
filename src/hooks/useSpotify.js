import { useState, useEffect } from 'react';
import axios from 'axios';

const LASTFM_USERNAME = 'lakshp';
const LASTFM_API_KEY = '0b1d51f7f741582cd0895125d1da45c3';
const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

const useSpotify = () => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await axios.get(API_URL);
        const track = data.recenttracks.track[0];

        if (track) {
          setSong({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            image: track.image[2]['#text'], // Large size
            isPlaying: track['@attr']?.nowplaying === 'true',
            url: track.url
          });
        }
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
    const interval = setInterval(fetchSong, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  return { song, loading };
};

export default useSpotify;