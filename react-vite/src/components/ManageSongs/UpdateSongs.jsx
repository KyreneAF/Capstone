import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateSong, thunkGetCurrSongs } from "../../redux/song";
import { useNavigate, useParams } from "react-router-dom";
import "../CreateSongForm/CreateSongForm.css";


function UpdateSongs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allSongs = useSelector((state) => state.song);
  const currUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [errors, setError] = useState({});
  const [imageName,setImageName] = useState("");
  const [audioName, setAudioName] = useState("")
  const [imageLoading, setImageLoading] = useState(false);
  const { id } = useParams();
  const currSong = allSongs[id];

  useEffect(() => {
    dispatch(thunkGetCurrSongs());
  }, [dispatch, id, currUser.id]);

  // this is to populate the input with previous info
  useEffect(() => {
    if (currSong) {
      setTitle(currSong.title);
      setGenre(currSong.genre);
      setImageName(`${title}_img.jpeg`);
      setAudioName(`${title}_audio.mp3`)
      setImage(currSong.image_file);
      setAudio(currSong.audio_file)

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
    console.log('IMAGE',image)
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
      <div className="create-song-form-cont ">
        <h2 className="cs-heading">{`Hello, ${currUser.username} update your song ${currSong.title}`}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-main-cont">
            <div className="csf-left-cont column">
              <div className="csf-img-cont column">
                <label>Image file</label>
                <div className='img-row'>
                <span className='input-names'>{ imageName? imageName : ""}</span>
                <input
                  className="box"
                  type="file"
                  accept="image/png, image/jpeg image/pdf, image/png, image/jpg, image/jpeg, image/gif"
                  onChange={(e) =>{ setImage(e.target.files[0]);setImageName("")}}

                />

                </div>
                <div
                  style={{ maxHeight: "20px", marginTop: "20px" }}
                  className="update-err-cont"
                >
                  {!image ? (
                    <span style={{ color: "red" }}>
                      Image file cannot be empty
                    </span>
                  ) : (
                    <span style={{ color: "white" }}>Holding</span>
                  )}
                </div>
                <div className="error-cont">
                  {errors.audio ? errors.audio : ""}
                </div>
              </div>
              <div className="csf-audio-cont column">
                <label>Audio file</label>
                <div className='audio-row'>
                <span className='input-names-audio'>{audioName ? audioName : ""}</span>
                <input
                  className="box"
                  type="file"
                  accept="audio/mp3"
                  onChange={(e) =>{ setAudio(e.target.files[0]); setAudioName("")}}
                />
                </div>
                <div
                  style={{ maxHeight: "20px", marginTop: "20px" }}
                  className="update-err-cont"
                >
                  {!audio ? (
                    <span style={{ color: "red" }}>
                      Audio file cannot be empty
                    </span>
                  ) : (
                    <span style={{ color: "white" }}>Holding</span>
                  )}
                </div>
              </div>
            </div>

            <div className="csf-right-cont column">
              <div className="csf-title-cont column">
                <label>Title</label>
                <input
                  value={title}
                  type="text"
                  maxLength="40"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div
                style={{ maxHeight: "20px", marginTop: "20px" }}
                className="comment-err-cont"
              >
                {!title.length ? (
                  <span style={{ color: "red" }}>Title cannot be empty</span>
                ) : (
                  <span style={{ color: "white" }}>Holding</span>
                )}
              </div>

              <div className="csf-genre-cont column">
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
                  <option value={"Dirty Bass"}>Dirty Bass</option>
                  <option value={"Hip-Hop"}>Hip-Hop</option>
                  <option value={"Rock"}>Rock</option>
                  <option value={"Electronic"}>Electronic</option>
                  <option value={"Pop"}>Pop</option>
                  <option value={"Latino"}>Latino</option>
                </select>
                <div className="error-cont">
                  {errors.genre ? errors.genre : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="submit-error-cont error-cont row">
            <button
              style={{ marginTop: "50px" }}
              disabled={!title || !genre || !image || !audio}
              className="border click"
              type="submit"
            >
              Update song
            </button>
          </div>

          <div style={{ marginTop: "20px" }} className="is-loading">
            {imageLoading &&<div id='loading-cont'>
              <p>Loading...</p>
              <img id='spin-gif' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'></img>
            </div> }
            {/* <div id='loading-cont'>
              <p>Loading...</p>
              <img id='spin-gif' src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'></img>

            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSongs;
