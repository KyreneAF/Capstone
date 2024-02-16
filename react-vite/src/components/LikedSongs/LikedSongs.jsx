import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetCurrLiked, clearState } from "../../redux/likedSong";
import { setCurrAudio,clearStateAudio,pauseCurrAudio } from "../../redux/audioPlayer";
import './LikedSongs.css'

function LikedSongs(){

    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)
    const currLikedSongs = useSelector(state => state.likedSong)
    const likedArr = Object.values(currLikedSongs)
    console.log(currUser)

    useEffect(() =>{
        dispatch(thunkGetCurrLiked(currUser.id))
        return () => dispatch(clearState())
    },[currUser])

    const handlePlayClick = (song) => {
        dispatch(pauseCurrAudio(false));
        dispatch(clearStateAudio());
        dispatch(setCurrAudio(song.id, song.audio_file));
        dispatch(pauseCurrAudio(true));
      };

    return(
        <div>
           {likedArr.map( liked =>(
            <div key={liked.id}>
                {/* <img className='land-sqr-img'
                src={liked.song.image_file}
                /> */}
                <div className='liked-img-cont'style={{ backgroundImage: `url(${liked.song.image_file})` }}>
                    {/* <span style={{backgroundImage:liked.song.image_file}}></span> */}
                    <div
                    onClick={() => handlePlayClick(liked.song)}
                    className="play-icon-cont-splash play-cont-liked click"
                  >
                    <i className="fa-solid fa-play play-icon-liked"></i>
                  </div>
                  <div clssName='heart-cont click'>
                    <i class="fa-solid fa-heart"></i>
                  </div>

                </div>
                <div className='liked-song-info-cont column'>
                    <span>{liked.song.title}</span>
                    <span>{liked.song.genre}</span>

                </div>

            </div>
           ))}
        </div>
    )

}

export default LikedSongs
