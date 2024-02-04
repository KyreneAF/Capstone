import { useSelector, useDispatch } from "react-redux";
import { thunkGetCurrSongs, clearState } from "../../redux/song";
import { useNavigate } from "react-router-dom";
import "./GreetingPage.css";
import { useEffect } from "react";

function GreetingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session.user);
  // const currSongs = useSelector((state) => state.song);
  // const songsArr = Object.values(currSongs);
  // const currSongsArr = songsArr.filter(
  //   (song) => song.user_id.id == currUser.id
  // );
  // console.log(currSongsArr);

  // useEffect(() => {
  //   dispatch(thunkGetCurrSongs());
  // }, [dispatch, currUser]);

  const handleNavMySongs = async () => {
    navigate("/songs/current");
    dispatch(clearState());
  };



  // if (!currSongs) return null;
  return (
    <div className="greeting-main-cont row">
      {/* <div className="greeting-nav-main-cont"> */}
      <div className="home click border" onClick={() => navigate("/")}>
        <div className='buttn-inner-div row'>
        <i className="fa-solid fa-house"></i>
        <span>Home</span>

        </div>
      </div>
      <div className="add-song-bttn click row border" onClick={() => navigate("/songs/new")} >
      <div className='buttn-inner-div row'>
        <i className="fa-solid fa-plus"></i>
        <span>Upload new track</span>
        </div>
      </div>
      {/* </div> */}
      { currUser ? (
        <div className="gp-user-song-cont row click border" onClick={handleNavMySongs}>
          <div className='buttn-inner-div row'>
          <img className="gp-img" src='https://cdn.pixabay.com/photo/2017/06/03/20/12/art-2369664_1280.jpg' />
          <div className="gp-user-song-title-cont column">
            <span>Your songs:</span>
            {/* <span>{currSongsArr.length} songs</span> */}
          </div>

          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GreetingPage;
