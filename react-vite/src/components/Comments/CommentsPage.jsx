import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments, clearState } from "../../redux/comment";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateCommentModal from "./UpdateCommentModal";
import CommentDeleteModal from "./CommentDeleteModal";
import "./CommentsPage.css";

function CommentsPage({ songId, song }) {
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.comment);
  const currUser = useSelector((state) => state.session.user);
  const commentsArr = Object.values(allComments).sort((a,b) => b.id - a.id);


  useEffect(() => {
    dispatch(thunkGetAllComments(songId));
    return () => dispatch(clearState());
  }, [dispatch,songId, currUser]);


  if (!commentsArr.length) return null;
  const commentDelete = (comment) =>{
    if(currUser && comment.user_id.id === currUser.id){
      return(
        <div className="pencil-delete row click">
                <OpenModalButton
                modalComponent={
                  <UpdateCommentModal comment={comment}  />
                }
                buttonText={<i className="fa-solid fa-pencil trans edit-pencil"></i> }
              />

              <OpenModalButton
                modalComponent={
                  <CommentDeleteModal id={comment.id} comments={song.comments} />
                }
                buttonText={ <i className="fa-solid fa-trash-can click trashcan trans"></i> }
              />
            </div>
          )}}




  return (
    <div className="comments-main-cont">
      {commentsArr.map((comment) => (
        <div
          className={
           currUser && comment.user_id.id === currUser.id
              ? "single-comment-cont-h "
              : "single-comment-cont block"
          }
          key={comment.id}
        >
          <p>{comment.user_id.username}</p>
          {commentDelete(comment)}

          <div className="comment-text-cont">
            <p>{comment.comment_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;
