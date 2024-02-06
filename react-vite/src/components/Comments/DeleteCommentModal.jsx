import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment, thunkGetAllComments} from "../../redux/comment";
import { useDispatch, useSelector } from "react-redux";
// import "./SongDeleteModal.css";

function CommentDeleteModal({ id, songId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currUser = useSelector((state) => state.session.user);



  // const handleDelete = () => {
  //   dispatch(thunkDeleteComment(id))
  //   closeModal();
  // };
  const handleDelete = async (e) =>{
    e.preventDefault();
     await dispatch(thunkDeleteComment(id))

    await dispatch(thunkGetAllComments(songId)).then(() =>{
      closeModal()
    })
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
