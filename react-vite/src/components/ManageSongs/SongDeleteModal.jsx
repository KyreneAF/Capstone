import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkDeleteSong, thunkGetCurrSongs } from "../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import "./SongDeleteModal.css";

function SongDeleteModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userSongs = useSelector((state) => state.song);
  const currUser = useSelector((state) => state.session.user);
  const song = userSongs[id];

  useEffect(() => {
    dispatch(thunkGetCurrSongs());
  }, [dispatch, currUser]);

  const handleDelete = async () => {
    await dispatch(thunkDeleteSong(id));
    await dispatch(thunkGetCurrSongs());
    closeModal();
  };

  const handleCancel = () => {
    return closeModal();
  };

  if (!song) return null;
  return (
    <div className="delete-song-modal column">
      <h3>Are you sure you want to delete</h3>
      <div className="delete-song-info-cont column">
        <img className="delete-img" src={song.image_file} />
        <span>{song.title}</span>
        <span>{song.num_likes} Likes</span>
      </div>
      <div id="delete-buttons-cont">
        <button className="modal-bttn click" onClick={handleDelete}>
          Delete
        </button>
        <button className="modal-bttn click" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SongDeleteModal;
