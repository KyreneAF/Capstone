import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllSongs } from "../../redux/song";
import "./SongDetails.css";

function SongDetails() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song);
  const { id } = useParams();
  const song = allSongs[id];

  useEffect(() => {
    dispatch(thunkGetAllSongs());
  }, [dispatch, id]);

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

  return <div className="ss-main-cont column">{renderSongDetails()}</div>;
}
export default SongDetails;
