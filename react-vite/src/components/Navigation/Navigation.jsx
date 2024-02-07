import ProfileButton from "./ProfileButton";
import GreetingPage from "../GreetingPage/GreetingPage";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-main-cont row block main">
      <div className='nav-greet-main-cont'>
        <GreetingPage />
      </div>
      <div className="nav-logo-main-cont" >
        <img className="logo-img click"src="https://cdn.discordapp.com/attachments/1176971554152775812/1203413459740401674/logo-no-background.png?ex=65d1011f&is=65be8c1f&hm=f0e4013f5b086d5eb14fee34c89725a86a0864832a46c5180addd3714bf36a8d&"/>
      </div>
      <div className='nav-profile-button-main-cont'>
        <ProfileButton />
      </div>
      <div className="audio-player-cont">
        <AudioPlayer />

      </div>
    </div>
  );
}

export default Navigation;
