// import { useState } from "react";

const AudioPlayer = () => {
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [src, setSrc] = useState("")

    // if(audioSrc){
    //     setSrc(audioSrc)
    //     setIsPlaying(true)
    // }

    // const togglePlayPause = () => {
    //   if (isPlaying) {
    //     audioRef.current.pause();
    //   } else {
    //     audioRef.current.play();
    //   }
    //   setIsPlaying(!isPlaying);
    // };
    // onClick={togglePlayPause}
    return (
      <div className="audio-player" >
        {/* <audio className={ isPlaying ? 'show' : 'hidden' } controls src={src} >
        </audio> */}
        <h3>From Audio Player</h3>
      </div>
    );
  };

  export default AudioPlayer;
