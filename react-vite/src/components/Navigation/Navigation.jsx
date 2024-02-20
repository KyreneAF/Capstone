import ProfileButton from "./ProfileButton";
// import GreetingPage from "../GreetingPage/GreetingPage";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session);
  console.log(currUser, "currUser");
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

      <div className="audio-player-cont">
        <AudioPlayer />
      </div>
    </div>
  );
}

export default Navigation;
