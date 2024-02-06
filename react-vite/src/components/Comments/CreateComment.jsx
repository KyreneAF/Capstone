import { thunkCreateComment, thunkGetAllComments } from "../../redux/comment";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function CreateComment({ songId, currUser }) {
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.comment);
  const userComment = Object.values(allComments).find(
    (comment) => comment.user_id.id === currUser
  );
  const [commentText, setCommentText] = useState();

  const handleCancel = () => {
    setCommentText("");
  };
  useEffect(() => {
    dispatch(thunkGetAllComments(songId));
  }, [dispatch, songId, currUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { comment_text: commentText };
    await dispatch(thunkCreateComment(newComment, songId));
    await dispatch(thunkGetAllComments(songId));
  };

  if (!currUser || userComment) return null;
  return (
    <div className="create-comment-main-cont">
      <form className="comment-form-cont column" onSubmit={handleSubmit}>
        <labe>Post your comment</labe>
        <textarea
          rows="4"
          cols="10"
          value={commentText}
          maxLength="50"
          placeholder="Add a comment"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="create-comment-bttn-cont">
          <button disabled={!commentText} onClick={handleCancel}>
            cancel
          </button>
          <button disabled={!commentText}>comment</button>
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
