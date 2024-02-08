import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllSongs } from "../../redux/song";
import {setCurrAudio,clearStateAudio,pauseCurrAudio,} from "../../redux/audioPlayer";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AudioPlayer from "../Navigation/AudioPlayer/AudioPlayer";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const allSongs = useSelector((state) => state.song);
  const allSongsArr = Object.values(allSongs);
  const hipHopSongs = allSongsArr.filter((song) => song.genre === "Hip-Hop");
  const rockSongs = allSongsArr.filter((song) => song.genre === "Rock");
  const elecSongs = allSongsArr.filter((song) => song.genre === "Electronic");
  const bassSongs = allSongsArr.filter((song) => song.genre === "Dirty Bass");
  const popSongs = allSongsArr.filter((song) => song.genre === "Pop");
  const latinSongs = allSongsArr.filter((song) => song.genre === "Latino");

  useEffect(() => {
    dispatch(thunkGetAllSongs());
  }, [dispatch]);

  const greetingMessage = () => {
    const time = new Date().getHours();
    let greeting = null;
    if (time < 12 && time > 5) greeting = "Good morning";
    else if (time >= 12 && time < 17) greeting = "Good afternoon";
    else greeting = "Good evening";
    return (
      <div className="land-greeting-cont block">
        <h3>{greeting}</h3>
      </div>
    );
  };

  const handlePlayClick = (song) => {
    dispatch(pauseCurrAudio(false));
    dispatch(clearStateAudio());
    dispatch(setCurrAudio(song.id, song.audio_file));
    dispatch(pauseCurrAudio(true));

  };

  const genreSort = (genre, arr) => {
    if (!allSongsArr.length) return null;
    return (
      <div className={`land-cont column block`}>
        <h3>{genre}</h3>
        <div className="genre-cont row">
          {arr.map((song) => (
            <div key={song.id} className="song-cont ">
              <div className="stacked click">
                <img
                  className="land-sqr-img"
                  src={song.image_file}
                  onError={(e) =>
                    (e.target.src =
                      "https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp")
                  }
                  onClick={() => navigate(`/songs/${song.id}`)}
                />
                <div className="land-song-info row click ">
                  {/* <span onClick={(e) => {e.stopPropagation();navigate(`/songs/${song.id}`)}}>{song.title},</span> */}
                  <div className='splash-song-producer-cont column'>
                  <NavLink className="navie" to={`/songs/${song.id}`}>
                    {song.title}
                  </NavLink>
                  <span style={{ color: "grey" }}>
                    {" "}
                    by: {song.user_id.username}
                  </span>

                  </div>
                <div
                  onClick={() => handlePlayClick(song)}
                  className="play-icon-cont-splash"
                >
                  <i className="fa-solid fa-play play-icon-splash"></i>
                </div>
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
      <div className="land-allSongs-cont block">
        <div className="land-greet-cont">{greetingMessage()}</div>
        <div className="songs">
          {genreSort("Hip-Hop", hipHopSongs)}
          {genreSort("Rock", rockSongs)}
          {genreSort("Electronic", elecSongs)}
          {genreSort("Dirty Bass", bassSongs)}
          {genreSort("Pop", popSongs)}
          {genreSort("Latino", latinSongs)}
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
