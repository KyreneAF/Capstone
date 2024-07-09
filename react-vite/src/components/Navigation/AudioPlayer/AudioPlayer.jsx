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
  }, [currAudio,isPlaying]);

  if (!currAudio[1]) return null;
  return (
    <div
      className="audio-player-main-cont"
      style={{ visibility: currAudio[1] ? "visible" : "hidden" }}
    >
      <ReactPlayer
        url={currAudio[1].audio}
        controls={true}
        playing={isPlaying.isPlaying}
        width="100%"
        height="50px"
      />
      <div id="playing-song-cont">
        <div>
          <img id="audio-player-img" src={currAudio[1].song.image_file} />
        </div>
        <div id="audio-player-info">
          <span>{currAudio[1].song.title}</span>
          <span id="ap-owner">{currAudio[1].song.user_id.username}</span>
        </div>
      </div>
    </div>
  );
}
export default AudioPlayer;
