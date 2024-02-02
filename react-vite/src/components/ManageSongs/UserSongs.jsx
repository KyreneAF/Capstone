import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetCurrSongs } from "../../redux/song";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import SongDeleteModal from "./SongDeleteModal";
import "./UserSongs.css";

export default function UserSongs() {
  const currSongs = useSelector((state) => state.song);
  const currSongsArr = Object.values(currSongs);
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const currUser = useSelector((state) => state.session.user);
  const hipHopSongs = currSongsArr.filter((song) => song.genre === "Hip-Hop");
  const rockSongs = currSongsArr.filter((song) => song.genre === "Rock");
  const elecSongs = currSongsArr.filter((song) => song.genre === "Electronic");
  const bassSongs = currSongsArr.filter((song) => song.genre === "Dirty Bass");
  const popSongs = currSongsArr.filter((song) => song.genre === "Pop");
  const latinSongs = currSongsArr.filter((song) => song.genre === "Latino");


useEffect(() =>{
    dispatch(thunkGetCurrSongs())
},[dispatch,currUser])



  if (!currSongsArr.length) return null;
  const genreSort = (genre, arr) => {
    return(
    <div className={`land-${genre}-cont block column`}>
     { arr.length ? <h3>{genre}</h3> : null}
      {arr && (
        <div className="row">
          {arr.map((song) => (
            <div
              key={song.id}
              className="column"
            >

                <img
                  className="land-sqr-img"
                  src={song.image_file}
                  onClick={() => navigate(`/songs/${song.id}`)}
                  onError={(e) =>
                    (e.target.src =
                      "https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp")
                  }
                />
                <div className='edit-bttn click' onClick={() => navigate(`/songs/edit/${song.id}`)}><i className="fa-solid fa-pencil"></i></div>
                {/* <div className='delete-bttn' ><i className="fa-solid fa-trash"></i></div> */}
                {/* Assuming you have a component named OpenModalButton */}
                <OpenModalButton
                  modalComponent={<SongDeleteModal id={song.id} song={song} />}
                  buttonText={"Remove Item Listing"}
                />
                <div className='us-title-cont'><span>{song.title}</span> </div>

              <div className="play-icon-cont"><i className="fa-solid fa-play play-icon"></i></div>
              <audio controls onError={(e) => console.error("Audio error:", e)}>
                <source src={song.audio_file} type="audio/mp3" />
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  )}

  if (!currSongsArr.length) return null;
  return (
    <div className="land-pg-main-cont column">
      {genreSort("Hip-Hop", hipHopSongs)}
      {genreSort("Rock",rockSongs)}
      {genreSort("Electronic",elecSongs )}
      {genreSort("Dirty Bass",bassSongs)}
      {genreSort("Pop",popSongs)}
      {genreSort("Latino",latinSongs)}
    </div>
  );
}
