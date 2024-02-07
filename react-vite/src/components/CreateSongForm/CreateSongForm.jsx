import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSong } from "../../redux/song";
import { useNavigate } from "react-router-dom";
import "./CreateSongForm.css";

function CreateSongForm() {
  // const history = useHistory(); // so that you can redirect after the image upload is successful
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);






const handleSubmit = async (e) => {
  e.preventDefault();
  // creating error object to appear under inputs
  const errObj = {};
  if (!title) errObj.title = "Must enter title...";
  if (!image) errObj.image = "Image file is required...";
  if (!audio) errObj.audio = "Audio file is required...";
  if (!genre) errObj.genre = "Must select a genre...";
  setErrors(errObj);

    setImageLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("title", title);
    formData.append("genre", genre);


    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea


    const newSong = await dispatch(thunkCreateSong(formData));

    if(newSong.errors) setImageLoading(false)


    if(newSong.id){
      navigate(`/songs/${newSong.song.id}`);
    }

  console.log("there are errors")
  };

  return (
    <div className="create-song-main-cont">
      <div className="create-song-form-cont ">
        <h2 className="cs-heading">{`Hello, ${currUser.username} upload your new song`}</h2>
        <form  onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form-main-cont'>


          <div className="csf-left-cont column">
            <div className="csf-img-cont column">
              <label>Image file</label>
              <input
              className="box"
                type="file"
                accept="image/png, image/jpeg image/pdf, image/png, image/jpg, image/jpeg, image/gif"
                onChange={(e) => setImage(e.target.files[0])}

              />
              <div className="error-cont">
                {errors.audio ? errors.audio : ""}
              </div>
            </div>
            <div className="csf-audio-cont column">
              <label>Audio file</label>
              <input
              className="box"
                type="file"
                accept="audio/mp3"
                onChange={(e) => setAudio(e.target.files[0])}
              />

              <div className="error-cont">
                {errors.image ? errors.image : ""}
              </div>
            </div>
          </div>

          <div className="csf-right-cont column">
            <div className="csf-title-cont column">
              <label>Title</label>
              <input
                type="text"
                maxLength="40"
                onChange={(e) => setTitle(e.target.value)}

              />
              <div className="error-cont">
                {errors.title ? errors.title : ""}
              </div>
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
          <div className="submit-error-cont error-cont">
            <button disabled={!title || ! genre || !image || !audio}className='border click' type="submit">Create song</button>
          </div >
          <div className='is-loading'>
          {imageLoading && <p>Loading...</p>}

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSongForm;
