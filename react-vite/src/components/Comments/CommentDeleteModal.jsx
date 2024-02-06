
import { useModal } from "../../context/Modal";
import { thunkDeleteComment} from "../../redux/comment";
import { useDispatch } from "react-redux";
// import "./SongDeleteModal.css";

function CommentDeleteModal({ id}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const handleDelete = () => {
  //   dispatch(thunkDeleteComment(id))
  //   closeModal();
  // };
  const handleDelete = async (e) =>{
    e.preventDefault();
     await dispatch(thunkDeleteComment(id))
      closeModal()
}


  const handleCancel = () => {
    return closeModal();
  };

  return (
    <div className="delete-song-modal column">
      <h3>Are you sure you want to delete</h3>
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

export default CommentDeleteModal;
