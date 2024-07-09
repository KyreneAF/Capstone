import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateSong, thunkGetCurrSongs } from "../../redux/song";
import { useNavigate, useParams } from "react-router-dom";
import "../CreateSongForm/CreateSongForm2.css";

function UpdateSongs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allSongs = useSelector((state) => state.song);
  const currUser = useSelector((state) => state.session.user);

  const { id } = useParams();
  const currSong = allSongs[id];
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [errors, setError] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(thunkGetCurrSongs());
  }, [dispatch, id, currUser.id]);

  useEffect(() => {
    if (currSong) {
      console.log("currsong", currSong);
      setTitle(currSong.title);
      setGenre(currSong.genre);
      setImage(currSong.image_file);
      setAudio(currSong.audio_file);
    }
  }, [currSong]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errObj = {};
    if (!title) errObj.title = "Must enter title...";
    if (!image) errObj.image = "Image file is required...";
    if (!audio) errObj.audio = "Audio file is required...";
    if (!genre) errObj.genre = "Must select a genre...";
    setError(errObj);

    setImageLoading(true);
    const formData = new FormData();

    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("title", title);
    formData.append("genre", genre);

    await dispatch(thunkUpdateSong(formData, id));

    navigate(`/songs/${id}`);
  };

  if (!currSong) return null;

  return (
    <div className="create-song-main-cont">
      <div className="create-song-form-cont">
        <h2 className="cs-heading">{`Hello, ${currUser.username} update your song`}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-main-cont">
            <label>Image file</label>
            <input
              className="box"
              type="file"
              accept="image/png, image/jpeg, image/pdf, image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div style={{ maxHeight: "20px" }} className="update-err-cont">
              {!image ? (
                <span style={{ color: "red" }}>Image file cannot be empty</span>
              ) : (
                <span className="holding" style={{ color: "white" }}>
                  Holding
                </span>
              )}
            </div>

            <label>Audio file</label>
            <input
              className="box"
              type="file"
              accept="audio/mp3"
              onChange={(e) => setAudio(e.target.files[0])}
            />
            <div style={{ maxHeight: "20px" }} className="update-err-cont">
              {!audio ? (
                <span style={{ color: "red" }}>Audio file cannot be empty</span>
              ) : (
                <span className="holding" style={{ color: "white" }}>
                  Holding
                </span>
              )}
            </div>

            <label>Title</label>
            <input
              type="text"
              maxLength="40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ maxHeight: "20px" }} className="update-err-cont">
              {!title ? (
                <span style={{ color: "red" }}>Title cannot be empty</span>
              ) : (
                <span className="holding" style={{ color: "white" }}>
                  Holding
                </span>
              )}
            </div>

            <label>Tell us your genre:</label>
            <select
              name="genre"
              id="pet-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled hidden>
                --Pick your genre--
              </option>
              <option value="Dirty Bass">Dirty Bass</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Rock">Rock</option>
              <option value="Electronic">Electronic</option>
              <option value="Pop">Pop</option>
              <option value="Latino">Latino</option>
            </select>
            <div style={{ maxHeight: "20px" }} className="update-err-cont">
              {!genre ? (
                <span style={{ color: "red" }}>Genre cannot be empty</span>
              ) : (
                <span className="holding" style={{ color: "white" }}>
                  Holding
                </span>
              )}
            </div>
          </div>
          <div className="submit-error-cont error-cont">
            <button
              disabled={!title || !genre || !image || !audio}
              className="border click"
              type="submit"
            >
              Update song
            </button>
            <div className="is-loading">
              {imageLoading && (
                <div id="loading-cont-cs">
                  <img
                    id="spin-gif"
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzVvYmI0bDJtZ2NxNHI3djE0c3JtYmU1ZWh0d2x4cDU2Y3R3azVxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSongs;
