import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

import "./AudioPlayer.css";

function AudioPlayer() {

  const currAudio = useSelector((state) => state.audio);
  const isPlaying = useSelector((state) => state.audio.isPlaying);
  if (!currAudio[1]) return null;
  return (
    <div className="audio-player-main-cont">
      <ReactPlayer
        url={currAudio[1]}
        controls={true}
        playing={isPlaying.isPlaying}
        width="100%"
        height="50px"
      />
    </div>
  );
}
export default AudioPlayer;
