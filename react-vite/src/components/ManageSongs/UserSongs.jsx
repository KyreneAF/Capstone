import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { thunkGetCurrSongs, clearState, thunkGetAllSongs } from "../../redux/song";
import { thunkGetAllSongs } from "../../redux/song";
import { setCurrAudio, pauseCurrAudio, clearStateAudio} from "../../redux/audioPlayer";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SongDeleteModal from "./SongDeleteModal";
import UserSongs404 from "./UserSongs404/UserSongs404";
import "./UserSongs.css";
// import AudioPlayer from "../Navigation/AudioPlayer/AudioPlayer";

export default function UserSongs() {
  const allSongs = useSelector((state) => state.song);
  const currUser = useSelector((state) => state.session.user);
  const allSongsArr = Object.values(allSongs);
  const currSongsArr = allSongsArr.filter(
    (song) => song.user_id.id === currUser.id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currUser = useSelector((state) => state.session.user);
  const hipHopSongs = currSongsArr.filter((song) => song.genre === "Hip-Hop");
  const rockSongs = currSongsArr.filter((song) => song.genre === "Rock");
  const elecSongs = currSongsArr.filter((song) => song.genre === "Electronic");
  const bassSongs = currSongsArr.filter((song) => song.genre === "Dirty Bass");
  const popSongs = currSongsArr.filter((song) => song.genre === "Pop");
  const latinSongs = currSongsArr.filter((song) => song.genre === "Latino");

  // useEffect(() => {
  //   dispatch(thunkGetCurrSongs());
  //   return () => dispatch(clearState());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(thunkGetAllSongs());
  }, [dispatch]);

  const handlePlayClick = (song) => {
    dispatch(pauseCurrAudio(false));
    dispatch(clearStateAudio());
    dispatch(setCurrAudio(song.id, song.audio_file));
    dispatch(pauseCurrAudio(true));
  };

  if (!currSongsArr.length) return <UserSongs404 />;
  const genreSort = (genre, arr) => {
    if (arr.length === 0 || !arr.some((song) => song.genre === genre)) {
      return null;
    }

    return (
      <div className={`land-cont column block`}>
        <h3>{genre}</h3>
        <div className="genre-cont-ms row">
          {arr.map((song) => {
            if (song.genre === genre) {
              return (
                // MAKING IMAGE A DIV TO LET OTHER CONTS LAY ONTOP
                <div className="user-single-tile column" key={song.id}>
                  <div
                    className="user-img-main-cont click"
                    style={{ backgroundImage: `url(${song.image_file})` }}
                  >
                    <div
                      // PLAY ICON CODE TO PLAY SONGS
                      key={song}
                      onClick={() => handlePlayClick(song)}
                      className="play-icon-cont-splash play-cont-user click"
                    >
                      <i className="fa-solid fa-play play-icon-liked"></i>
                    </div>
                    <div className="pencil-delete row click ">
                      {/* TRASHCAN AND PENCIL ICONS */}
                      <div
                        className="edit-bttn click"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/songs/edit/${song.id}`);
                        }}
                      >
                        <i className="fa-solid fa-pencil trans"></i>
                      </div>

                      <OpenModalButton
                        modalComponent={
                          <SongDeleteModal id={song.id} song={song} />
                        }
                        buttonText={
                          <i className="fa-solid fa-trash-can click trashcan trans"></i>
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div
                    className="us-title-cont"
                    onClick={() => navigate(`/songs/${song.id}`)}
                  >
                    <span className="navie click">{song.title}</span>{" "}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  };
  if (!currSongsArr.length) return null;
  return (
    <div className="land-pg-main-cont column">
      <div
        className="add-song-bttn click row"
        onClick={() => navigate("/songs/new")}
      >
        <div
          style={{ color: "#c91696" }}
          className="buttn-inner-div-ms row"
          onClick={() => navigate("/songs/new")}
        >
          <i className="fa-solid fa-plus"></i>
          <span>Upload new track</span>
        </div>
      </div>
      {genreSort("Hip-Hop", hipHopSongs)}
      {genreSort("Rock", rockSongs)}
      {genreSort("Electronic", elecSongs)}
      {genreSort("Dirty Bass", bassSongs)}
      {genreSort("Pop", popSongs)}
      {genreSort("Latino", latinSongs)}
      {/* <AudioPlayer /> */}
    </div>
  );
}

// old code
// return (
//   <div className={`land-cont column block`}>
//     <h3>{genre}</h3>
//     <div className="genre-cont-ms row">
//       {arr.map((song) => {
//         if (song.genre === genre) {
//           return (
//             <div key={song.id} className="column">
//               <div className="pencil-delete row click ">
//                 <div
//                   className="edit-bttn click"
//                   onClick={() => navigate(`/songs/edit/${song.id}`)}
//                 >
//                   <i className="fa-solid fa-pencil trans"></i>
//                 </div>

//                 <OpenModalButton
//                   modalComponent={
//                     <SongDeleteModal id={song.id} song={song} />
//                   }
//                   buttonText={
//                     <i className="fa-solid fa-trash-can click trashcan trans"></i>
//                   }
//                 />
//               </div>

//               <img
//                 className="land-sqr-img ms-image"
//                 src={song.image_file}
//                 onClick={() => handlePlayClick(song)}
//                 onError={(e) =>
//                   (e.target.src =
//                     "https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp")
//                 }
//               />

//               <div
//                 className="us-title-cont"
//                 onClick={() => navigate(`/songs/${song.id}`)}
//               >
//                 <span className="navie click">{song.title}</span>{" "}
//               </div>
//             </div>
//           );
//         } else {
//           return null;
//         }
//       })}
//     </div>
//   </div>
// );
// };
