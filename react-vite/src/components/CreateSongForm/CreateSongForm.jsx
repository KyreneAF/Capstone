import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { thunkCreateSong } from "../../redux/song";
import './CreateSongForm.css'

function CreateSongForm() {
  // const history = useHistory(); // so that you can redirect after the image upload is successful
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [errors, setError] = useState({});
  const [imageLoading, setImageLoading] = useState(false);


  // Trying to allow drag and drop

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile.type.startsWith('image')) {
      setImage(droppedFile);
    } else if (droppedFile.type.startsWith('audio')) {
      setAudio(droppedFile);
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    // creating error object to appear under inputs
    const errObj = {}
    if(!title) errObj.title = "Must enter title..."
    if(!image) errObj.image = "Image file is required..."
    if(!audio) errObj.audio = "Audio file is required"
    if(!genre) errObj.genre = "Must select a genre"
    setError(errObj)



    console.log(image,audio,title,genre)
    const formData = new FormData();
    formData.append("image",image);
    formData.append("audio",audio);
    formData.append("title",title);
    formData.append("genre",genre);
    // formData.append("user_id",user.id)

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(thunkCreateSong(formData));
    // history.push("/images");
  };

  return (
    <div className="create-song-main-cont" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
    <div className="create-song-form-cont block">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="csf-left-cont column">

        <div className='csf-img-cont column'>
            <label>Image file</label>
            <input type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
            <div className="error-cont">{errors.audio? errors.audio : ""}</div>
        </div>
        <div className='csf-audio-cont column'>
            <label>Audio file</label>
            <input type="file" accept="audio/mp3" onChange={(e) => setAudio(e.target.files[0])} />
            <div className="error-cont">{errors.image? errors.image : ""}</div>
        </div>

        </div>


        <div className="csf-right-cont column">

          <div className="csf-title-cont column">
            <label >Title</label>
            <input type="text" maxLength="40" onChange={(e) => setTitle(e.target.value)} />
            <div className="error-cont">{errors.title? errors.title : ""}</div>
          </div>

          <div className="csf-genre-cont column">
            <label >Tell us your genre:</label>
            <select name="genre" id="pet-select" onChange={(e) => setGenre(e.target.value)}>
              <option value={"Dirty Bass"}>Dirty Bass</option>
              <option value={"Hip-Hop"}>Hip-Hop</option>
              <option value={"Rock"}>Rock</option>
              <option value={"Electronic"}>Electronic</option>
              <option value={"Pop"}>Pop</option>
              <option value={"Latino"}>Latino</option>
            </select>
            <div className="error-cont">{errors.genre? errors.genre : ""}</div>
          </div>
        </div>
        <div className='submit-error-cont error-cont'>
         <button type="submit"  >Submit</button>

        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
    </div>
  );
}

export default CreateSongForm;
