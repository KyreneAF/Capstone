import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { thunkGetAllSongs } from "../../redux/song";
import { setCurrAudio, clearStateAudio, pauseCurrAudio,} from "../../redux/audioPlayer";
import { thunkCreateLiked, } from "../../redux/likedSong";
// import RecentlyPlayed from "./RecentlyPlayed/RecentlyPld
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector(state => state.session.user)
  const allSongs = useSelector((state) => state.song);
  // const allLiked = useSelector((state) => state.likedSong)
  // const allLikedArr = Object.values(allLiked)
  const allSongsArr = Object.values(allSongs);
  const hipHopSongs = allSongsArr.filter((song) => song.genre === "Hip-Hop");
  const rockSongs = allSongsArr.filter((song) => song.genre === "Rock");
  const elecSongs = allSongsArr.filter((song) => song.genre === "Electronic");
  const bassSongs = allSongsArr.filter((song) => song.genre === "Dirty Bass");
  const popSongs = allSongsArr.filter((song) => song.genre === "Pop");
  const latinSongs = allSongsArr.filter((song) => song.genre === "Latino");
  const [showPopup, setShowPopup] = useState(false)
  const [toggleSong, setToggleSong] = useState('')


  useEffect(() => {
    dispatch(thunkGetAllSongs());
    // dispatch(thunkGetCurrLiked(currUser?.id))
  }, [dispatch,currUser]);



  const handlePlayClick = (e,song) => {
    e.stopPropagation();
    dispatch(pauseCurrAudio(false));
    dispatch(clearStateAudio());
    dispatch(setCurrAudio(song.id, song.audio_file, song));
    dispatch(pauseCurrAudio(true));
  };

  const handelLiked = async(e,song) =>{
    e.stopPropagation();

    try {

        await dispatch(thunkCreateLiked(song.id));
         setShowPopup(true);
         setToggleSong(song)

         setTimeout(() => {
           setShowPopup(false);
           setToggleSong('')

         }, 2000);




    } catch (error) {
        console.error('Error:', error);
    }
  }

  const genreSort = (genre, arr) => {
    if (!allSongsArr.length) return null;

    return (
      <div className={`land-cont block column`}>
        <h3>{genre}</h3>

        <div className="genre-cont row">
          {arr.map((song) => (
            <div key={song.id} className="song-cont ">
              <div
              className="land-sqr-img click"
              style={{ backgroundImage: `url(${song.image_file})`,width: '170px',height: '170px', }}
              onClick={() => navigate(`/songs/${song.id}`)}
            >
              <div
                onClick={(e) => handlePlayClick(e,song)}
                className="play-icon-cont-splash click"
              >
                <i className="fa-solid fa-play play-icon-liked"></i>
              </div>
              {currUser &&
              <div className="liked-song-info-cont column">
              <div className="heart-title-cont-splash row">
                <div className="heart-cont-splash click" onClick={(e) =>{handelLiked(e,song)}} >
                <i
                  className='fa-solid fa-heart splash-heart'
                  ></i>
                </div>
              </div>
            </div>}

              </div>
                <div className="land-song-info row click ">
                  {/* <span onClick={(e) => {e.stopPropagation();navigate(`/songs/${song.id}`)}}>{song.title},</span> */}
                  <div className="splash-song-producer-cont column">
                    <NavLink className="navie" to={`/songs/${song.id}`}>
                      {song.title}
                    </NavLink>
                    <span style={{ color: "grey" }}>
                      {" "}
                      by: {song.user_id.username}
                    </span>
                  </div>

                </div>

              <span className="hidden">tricky! </span>
            </div>
          ))}
        </div>

      </div>
    );
  };

  if (!allSongsArr.length) return null;
  return (
    <div className="land-pg-main-cont main">
      {(showPopup && toggleSong) &&
      <div className='splash-added'>
        <div id='toggle-top'>
          <img className='toggle-img'src={toggleSong.image_file}/>
        </div>
        <div id='toggle-bttm'>
          <span>{toggleSong.title}</span>
          <span>was added to your <NavLink to='/songs/current'>Library</NavLink></span>

        </div>
        </div>}
      <div className="land-allSongs-cont block">
        {/* <div className="land-greet-cont">{greetingMessage()}</div> */}
        <div className="land-greet-cont" style={{ height: '45px' }}></div>
        <div className="songs">
          {genreSort("Hip-Hop", hipHopSongs)}
          {genreSort("Rock", rockSongs)}
          {genreSort("Pop", popSongs)}
          {genreSort("Latino", latinSongs)}
          {genreSort("Electronic", elecSongs)}
          {genreSort("Dirty Bass", bassSongs)}
        </div>
      </div>

    </div>
  );
}

export default SplashPage;


// import { useSelector, useDispatch } from "react-redux";
// import { thunkGetAllSongs } from "../../redux/song";
// import {
//   setCurrAudio,
//   clearStateAudio,
//   pauseCurrAudio,
// } from "../../redux/audioPlayer";
// // import RecentlyPlayed from "./RecentlyPlayed/RecentlyPlayed";
// import { useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./SplashPage.css";

// function SplashPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const allSongs = useSelector((state) => state.song);
//   const allSongsArr = Object.values(allSongs);
//   const hipHopSongs = allSongsArr.filter((song) => song.genre === "Hip-Hop");
//   const rockSongs = allSongsArr.filter((song) => song.genre === "Rock");
//   const elecSongs = allSongsArr.filter((song) => song.genre === "Electronic");
//   const bassSongs = allSongsArr.filter((song) => song.genre === "Dirty Bass");
//   const popSongs = allSongsArr.filter((song) => song.genre === "Pop");
//   const latinSongs = allSongsArr.filter((song) => song.genre === "Latino");


//   // useEffect(() => {
//   //   dispatch(thunkGetCurrLiked(currUser.id));
//   //   return () => dispatch(clearState());
//   // }, [dispatch, currUser]);





//   useEffect(() => {
//     dispatch(thunkGetAllSongs());
//   }, [dispatch]);

//   // const greetingMessage = () => {
//   //   // return(
//   //   //   <div>
//   //   //   <img src='https://www.freewebheaders.com/gc-music-art-800x200/cache/broken-turntable-vinyl-disc-black-music-banner_gc-banner-800x200_248871.jpg-nggid0511796-ngg0dyn-1920x1080x100-00f0w010c010r110f110r010t010.jpg' alt="Banner" />
//   //   //   {/* Or, using a div with background image */}
//   //   //   {/* <div style={{ backgroundImage: `url(https://www.freewebheaders.com/gc-music-art-800x200/cache/broken-turntable-vinyl-disc-black-music-banner_gc-banner-800x200_248871.jpg-nggid0511796-ngg0dyn-1920x1080x100-00f0w010c010r110f110r010t010.jpg' alt="Banner)` }}></div> */}
//   //   // </div>
//   //   //)
//   //   // const time = new Date().getHours();
//   //   // let greeting = null;
//   //   // if (time < 12 && time > 5) greeting = "Good morning";
//   //   // else if (time >= 12 && time < 17) greeting = "Good afternoon";
//   //   // else greeting = "Good evening";
//   //   // return (
//   //   //   <div className="land-greeting-cont block neon-text">
//   //   //     <h3 className="modern-greeting">{greeting}</h3>
//   //   //   </div>
//   //   // );
//   // };

//   const handlePlayClick = (song) => {
//     dispatch(pauseCurrAudio(false));
//     dispatch(clearStateAudio());
//     dispatch(setCurrAudio(song.id, song.audio_file, song));
//     dispatch(pauseCurrAudio(true));
//   };

//   const genreSort = (genre, arr) => {
//     if (!allSongsArr.length) return null;

//     return (
//       <div className={`land-cont block column`}>
//         <h3>{genre}</h3>

//         <div className="genre-cont row">
//           {arr.map((song) => (
//             <div key={song.id} className="song-cont ">
//               <div className="stacked click">
//                 <img
//                   className="land-sqr-img"
//                   src={song.image_file}
//                   onError={(e) =>
//                     (e.target.src =
//                       "https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp")
//                   }
//                   onClick={() => navigate(`/songs/${song.id}`)}
//                 />
//                 <div className="land-song-info row click ">
//                   {/* <span onClick={(e) => {e.stopPropagation();navigate(`/songs/${song.id}`)}}>{song.title},</span> */}
//                   <div className="splash-song-producer-cont column">
//                     <NavLink className="navie" to={`/songs/${song.id}`}>
//                       {song.title}
//                     </NavLink>
//                     <span style={{ color: "grey" }}>
//                       {" "}
//                       by: {song.user_id.username}
//                     </span>
//                   </div>
//                   <div
//                     onClick={() => handlePlayClick(song)}
//                     className="play-icon-cont-splash click"
//                   >
//                     <i className="fa-solid fa-play play-icon-splash click"></i>
//                   </div>
//                 </div>
//               </div>

//               <span className="hidden">tricky! </span>
//             </div>
//           ))}
//         </div>

//       </div>
//     );
//   };

//   if (!allSongsArr.length) return null;
//   return (
//     <div className="land-pg-main-cont main">
//       <div className="land-allSongs-cont block">
//         {/* <div className="land-greet-cont">{greetingMessage()}</div> */}
//         <div className="land-greet-cont" style={{ height: '45px' }}></div>
//         <div className="songs">
//           {genreSort("Hip-Hop", hipHopSongs)}
//           {genreSort("Rock", rockSongs)}
//           {genreSort("Pop", popSongs)}
//           {genreSort("Latino", latinSongs)}
//           {genreSort("Electronic", elecSongs)}
//           {genreSort("Dirty Bass", bassSongs)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SplashPage;
