import { thunkCreateComment } from "../../redux/comment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateCommentModal.css'
// import "./SongDeleteModal.css";

function CreateCommentModal({ songId,song}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [commentText, setCommentText] = useState('');


  const handleCreate = async (e) => {
    const newComment = { comment_text: commentText };
    e.preventDefault();
    await dispatch(thunkCreateComment(newComment, songId));
      closeModal();

  };
  console.log('SONG',song)
  const handleCancel = () => {
    return closeModal();
  };

  return (
    <div className="create-comment-main-cont column">
      <form className="comment-form-cont column" onSubmit={handleCreate}>
        <div className='form-inner-cont column'>
        <h3>Post your comment for:</h3>
        <div style={{fontWeight:'500',marginBottom:'5px'}}> {song.title}</div>
        <img src={song.image_file}/>
        <textarea
          rows="6"
          cols="25"
          value={commentText}
          maxLength="60"
          placeholder="Add a comment"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div style={{maxHeight:'20px'}} className='comment-err-cont'>
          {!commentText.length ?<span style={{color:'red'}} >Comment text must not be empty</span> :
          <span style={{color:'white'}} >Holding</span>
          }

        </div>
        <div className="delete-buttons-cont">
          <button id='create-modal-cancel-bttn' className="modal-bttn click"  onClick={handleCancel}>
            cancel
          </button>
          <button className="modal-bttn click" disabled={!commentText.length}>comment</button>
        </div>
        </div>
      </form>

    </div>
  );
}

export default CreateCommentModal;
