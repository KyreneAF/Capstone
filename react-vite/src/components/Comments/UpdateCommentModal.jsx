import { thunkUpdateComment} from "../../redux/comment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateCommentModal.css'
// import "./SongDeleteModal.css";

function UpdateCommentModal({comment}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [commentText, setCommentText] = useState(comment.comment_text);


  const handleUpdate = async (e) => {
    const newComment = { comment_text: commentText };
    e.preventDefault();
    await dispatch(thunkUpdateComment(newComment, comment.id));
    // await dispatch(thunkGetAllComments(songId))
      closeModal();

  };

  const handleCancel = () => {
    return closeModal();
  };

  return (
    <div className="create-comment-main-cont column">
      <form className="comment-form-cont column" onSubmit={handleUpdate}>
        <div className='form-inner-cont column'>
        <h3>Post your comment</h3>
        <textarea
          rows="6"
          cols="10"
          value={commentText}
          maxLength="60"
          placeholder="Add a comment"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="delete-buttons-cont">
          <button id='create-modal-cancel-bttn' className="modal-bttn click"  onClick={handleCancel}>
            cancel
          </button>
          <button className="modal-bttn click" disabled={!commentText}>comment</button>
        </div>
        </div>
      </form>

    </div>
  );
}

export default UpdateCommentModal;
