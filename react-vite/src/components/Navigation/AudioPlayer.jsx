import { useState } from "react";

const AudioPlayer = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState("")

    if(audioSrc){
        setSrc(audioSrc)
        setIsPlaying(true)
    }
console.log(isPlaying)
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
      </div>
    );
  };

  export default AudioPlayer;
