import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllSongs } from "../../redux/song";
import { thunkGetAllComments } from "../../redux/comment";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateCommentModal from "../Comments/CreateCommentModal";
import "./SongDetails.css";
import CommentsPage from "../Comments/CommentsPage";

function SongDetails() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song);
  const allComments = useSelector((state) => state.comment);
  const currUser = useSelector((state) => state.session.user);
  const commentsArr = Object.values(allComments);
  const { id } = useParams();
  const song = allSongs[id];
  const userComment = commentsArr.find((comment) => comment.user_id.id === currUser);

  useEffect(() => {
    if (Object.values(allSongs).length === 0) {
      dispatch(thunkGetAllSongs());
    }
  }, [id]);

  // call all comments
  useEffect(() => {
    dispatch(thunkGetAllComments(id));
  },[dispatch,id]);


  if (!Object.values(allSongs).length) return null;
  const renderSongDetails = () => {
    return (
      <div className="song-main-cont column">
        <div className="song-img-play-poser-cont">
          <div className="ss-info-con">
            <img className="single-song-img" src={song.image_file} />
            <div className="play-icon-cont">
              <i className="fa-solid fa-play play-icon"></i>
            </div>
            {/* <audio controls onError={(e) => console.error('Audio error:', e)}>
                            <source src={song.audio_file} type="audio/mp3" />
                        </audio> */}
            <div className="info-cont">
              {/* <span>{`produced by ${song.user_id.username}`}</span> */}
              <span>
                {`produced by `}
                <span style={{ color: "#c91696" }}>
                  {song.user_id.username}
                </span>
              </span>
              <div className="ss-liked-cont">
                <div id="heart-cont">
                  <i className="fa-solid fa-heart"></i>
                  <span>{song.num_likes} Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderAddCommentBttn = () =>{
    if(song.user_id.id !== currUser || !userComment){
      return (
        <OpenModalButton
        modalComponent={<CreateCommentModal songId={song.id} />}
        buttonText={
        <span style={{color:"#c91696",fontWeight:"400"}} className="click">
          Add a comment <i className="fa-solid fa-plus"></i>
        </span>}
      />
      )}}


  return (
    <div className="ss-main-cont column">
      {renderSongDetails()}
      {renderAddCommentBttn()}
      <CommentsPage songId={song.id} song={song} comments={song.comments} />
    </div>
  );
}
export default SongDetails;
