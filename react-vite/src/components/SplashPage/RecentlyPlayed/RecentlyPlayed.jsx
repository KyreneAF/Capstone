import { useState, useEffect } from "react";

function RecentlyPlayed() {
  // State to store recently played songs
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Function to fetch recently played songs from cache
  const fetchRecentlyPlayed = () => {
    // Fetch recently played songs from cache (example)
    const cachedRecentlyPlayed = localStorage.getItem("recentlyPlayed");
    if (cachedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(cachedRecentlyPlayed));
    }
  };

  // Effect to fetch recently played songs on component mount
  useEffect(() => {
    fetchRecentlyPlayed();
  }, []);

  // Function to handle adding a song to recently played list
  //THIS IS A FUTURE FUNCTION I AM STILL TESTING OUT. THIS WILL CREATE A CACHE AND DISPLAY RECENTLY PLAYED SONGS TO THE SPLASH PAGE
  // const addToRecentlyPlayed = (song) => {
  //   // Check if song is already in recently played list
  //   const isSongAlreadyPlayed = recentlyPlayed.some(
  //     (playedSong) => playedSong.id === song.id
  //   );

  //   // If song is not already in recently played list, add it
  //   if (!isSongAlreadyPlayed) {
  //     const updatedRecentlyPlayed = [song, ...recentlyPlayed.slice(0, 9)]; // Limit to 10 recently played songs
  //     setRecentlyPlayed(updatedRecentlyPlayed);
  //     // Store updated recently played list in cache
  //     localStorage.setItem(
  //       "recentlyPlayed",
  //       JSON.stringify(updatedRecentlyPlayed)
  //     );
  //   }
  // };

  return (
    <div>
      <h2>Recently Played</h2>
      <ul>
        {recentlyPlayed.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyPlayed;
