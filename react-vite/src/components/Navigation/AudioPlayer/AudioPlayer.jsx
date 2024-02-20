import React from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

import "./AudioPlayer.css";

function AudioPlayer() {
  const currAudio = useSelector((state) => state.audio);
  const isPlaying = useSelector((state) => state.audio.isPlaying);

  useEffect(() => {
    // Check if currAudio[1] (currently playing song URL) is available
    if (currAudio[1]) {
      // Add the currently playing song to local storage
      localStorage.setItem("recentlyPlayed", JSON.stringify(currAudio[1].song));
    }
  }, [currAudio]);

  if (!currAudio[1]) return null;
  return (
    <div className="audio-player-main-cont">
      <ReactPlayer
        url={currAudio[1].audio}
        controls={true}
        playing={isPlaying.isPlaying}
        width="100%"
        height="50px"
      />
    </div>
  );
}
export default AudioPlayer;
