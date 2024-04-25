import ProfileButton from "./ProfileButton";
// import GreetingPage from "../GreetingPage/GreetingPage";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { thunkGetAllSongs } from "../../redux/song";

function Navigation() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session);
  const allSongs = useSelector((state) => state.song);
  const allSongsArr = Object.values(allSongs);
  const sortedSongs = allSongsArr.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="nav-main-cont row">
      <div className="nav-greet-main-cont">
        {/* <GreetingPage /> */}
        <div className="left-nav-buttons row">
          <div className="logo-main-cont row">
            <img
              onClick={() => navigate("/")}
              className="click"
              src="https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-large-1645807040.jpg"
              style={{ height: "60px", width: "60px" }}
            />
          </div>
          <div
            className="home-main-cont nav-bttn click"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          {currUser.user ? (
            <div className="row">
              <div
                className="library-cont nav-bttn click"
                onClick={() => navigate("/songs/current")}
              >
                Library
              </div>
              <div
                className="add-song-cont row nav-bttn click"
                onClick={() => navigate("/songs/new")}
              >
                Upload Song
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="nav-profile-button-main-cont">
        <ProfileButton />
      </div>
      <div className="search-main-cont">
        <div id="search-input-cont">
          <input
            type="search"
            id="search-bar"
            value={searchWord}
            placeholder="Search..."
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div id="search-results-list-main-cont">
          {searchWord.length > 0 && (
            <div id="search-results-list">
              {searchWord.length > 0 &&
                sortedSongs
                  .filter(
                    (song) =>
                      song.title
                        .toLowerCase()
                        .startsWith(searchWord.toLowerCase()) ||
                      song.user_id.username
                        .toLowerCase()
                        .startsWith(searchWord.toLowerCase())
                  )
                  .map((song) => (
                    <div
                      key={song.id}
                      className="indi-search click"
                      onClick={() => {
                        setSearchWord("");
                        navigate(`/songs/${song.id}`);
                      }}
                    >
                      <img id="search-img" src={song.image_file} />
                      <span>{song.title}</span>
                      <span>-{song.user_id.username}</span>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      <div className="audio-player-cont">
        <AudioPlayer />
      </div>
    </div>
  );
}

export default Navigation;
