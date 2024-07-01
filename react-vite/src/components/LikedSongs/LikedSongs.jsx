import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  thunkGetCurrLiked,
  thunkDeleteLiked,
  clearState,
} from "../../redux/likedSong";
import {
  setCurrAudio,
  clearStateAudio,
  pauseCurrAudio,
} from "../../redux/audioPlayer";
import "./LikedSongs.css";
import LikedSongs404 from "./LikedSongs404";

function LikedSongs() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currUser = useSelector((state) => state.session.user);
  const currLikedSongs = useSelector((state) => state.likedSong);
  const likedArr = Object.values(currLikedSongs);


  useEffect(() => {
    dispatch(thunkGetCurrLiked(currUser.id));
    return () => dispatch(clearState());
  }, [dispatch,currUser]);

  const handlePlayClick = (song) => {
    dispatch(pauseCurrAudio(false));
    dispatch(clearStateAudio());
    dispatch(setCurrAudio(song.id, song.audio_file,song));
    dispatch(pauseCurrAudio(true));
  };

  //ADD TO FAVORTIES
  const removeFromLiked = (id) => {
    if (currLikedSongs[id]) {
      dispatch(thunkDeleteLiked(id));
    }
  };
  if (!likedArr.length) return <LikedSongs404 />;
  // const genreSort = (genre, arr) => {
  //   if (arr.length === 0 || !arr.some((song) => song.genre === genre)) {
  //     return null;
  //   }

  // if(likedArr.length)return null
  return (
    <div className='liked-songs-main-cont'>
      {likedArr.length === 0 ? (
        <LikedSongs404 />
      ) : (
        likedArr.map((liked) => (
          <div key={liked.id}>
            <div
              className="liked-img-cont click"
              style={{ backgroundImage: `url(${liked.song?.image_file})` }}
              onClick={() => navigate(`/songs/${liked.song?.id}`)}
            >
              <div
                onClick={() => handlePlayClick(liked.song)}
                className="play-icon-cont-splash play-cont-liked click"
              >
                <i className="fa-solid fa-play play-icon-liked"></i>
              </div>
            </div>
            <div className="liked-song-info-cont column">
              <div className="heart-title-cont row">
                <div className="heart-cont click" onClick={() => removeFromLiked(liked?.id)}>
                  <i
                    className={
                      currLikedSongs[liked?.id]
                        ? 'fa-solid fa-heart filled-heart'
                        : 'fa-regular fa-heart empty-heart click'
                    }
                  ></i>
                </div>
                <span>{liked.song?.title}</span>
              </div>
              <span style={{color:'grey', marginLeft:'20px'}}>{liked.song?.genre}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LikedSongs;



// const addToLiked = (likedSong) => {
//     if (currLikedSongs[likedSong.id]) {
//       dispatch(thunkDeleteLiked(likedSong.id));
//     } else{
//       dispatch(thunkCreateLiked(likedSong.song.id));
//     }
//   };



// return (
//     <div>
//       {likedArr.map((liked) => (
//         <div key={liked.id}>
//           <div
//             className="liked-img-cont"
//             style={{ backgroundImage: `url(${liked.song.image_file})` }}
//           >
//             <div
//               onClick={() => handlePlayClick(liked.song)}
//               className="play-icon-cont-splash play-cont-liked click"
//             >
//               <i className="fa-solid fa-play play-icon-liked"></i>
//             </div>
//           </div>
//           <div className="liked-song-info-cont column">
//             <div className='heart-title-cont row'>
//             <div className="heart-cont click" onClick={() => removeFromLiked(liked.id)}>
//               <i className={ currLikedSongs[liked.id]?"fa-solid fa-heart filled-heart" : "fa-regular fa-heart empty-heart click"}></i>
//             </div>
//               <span>{liked.song.title}</span>

//             </div>
//             <span>{liked.song.genre}</span>
//           </div>
//         </div>
//       ))}

//     </div>
//   );
