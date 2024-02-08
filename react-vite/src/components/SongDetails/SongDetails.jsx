import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllSongs } from "../../redux/song";
import { thunkGetAllComments } from "../../redux/comment";
import {
  setCurrAudio,
  pauseCurrAudio,
  clearStateAudio,
} from "../../redux/audioPlayer";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateCommentModal from "../Comments/CreateCommentModal";
import "./SongDetails.css";
import CommentsPage from "../Comments/CommentsPage";
import AudioPlayer from "../Navigation/AudioPlayer/AudioPlayer";

function SongDetails() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song);
  const allComments = useSelector((state) => state.comment);
  const currUser = useSelector((state) => state.session.user);
  const commentsArr = Object.values(allComments);
  const { id } = useParams();
  const song = allSongs[id];
  const userComment = commentsArr.some(
    (comment) => comment.user_id.id === currUser?.id
  );

  useEffect(() => {
    dispatch(thunkGetAllSongs());
  }, [dispatch]);

  // call all comments
  useEffect(() => {
    dispatch(thunkGetAllComments(id));
  }, [dispatch, id]);

  const handlePlayClick = (song) => {
    dispatch(pauseCurrAudio(false));
    dispatch(clearStateAudio());
    dispatch(setCurrAudio(song.id, song.audio_file));
    dispatch(pauseCurrAudio(true));
  };

  if (!Object.values(allSongs).length) return null;
  const renderSongDetails = () => {
    return (
      <div className="song-main-cont column">
        <div className="song-img-play-poser-cont">
          <div className="ss-info-con">
            <img className="single-song-img" src={song.image_file} />
            <div className="info-cont">
              <span>
                {`produced by `}
                <span style={{ color: "#c91696" }}>
                  {song.user_id.username}
                </span>
              </span>
              <div className="ss-liked-cont row">
                <div className="play-icon-cont click">
                  <i
                    className="fa-solid fa-play play-icon click"
                    onClick={() => handlePlayClick(song)}
                  ></i>
                </div>
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

  const renderAddCommentBttn = () => {
    if (currUser && song && !userComment && song.user_id.id !== currUser.id) {
      return (
        <div id="add-comment-link">
          <OpenModalButton
            modalComponent={<CreateCommentModal songId={song.id} />}
            buttonText={
              <span
                style={{
                  color: "#c91696",
                  fontWeight: "400",
                  fontSize: "20px",
                }}
                className="click"
              >
                Add a comment <i className="fa-solid fa-plus"></i>
              </span>
            }
          />
        </div>
      );
    }
  };
  if (!Object.values(allSongs).length) return null;
  return (
    <div className="ss-main-cont column">
      {renderSongDetails()}
      {renderAddCommentBttn()}
      <CommentsPage songId={song.id} song={song} comments={song.comments} />
      {/* <AudioPlayer /> */}
    </div>
  );
}
export default SongDetails;
