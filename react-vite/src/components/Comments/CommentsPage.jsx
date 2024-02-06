import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllComments,clearState } from "../../redux/comment";
import { useEffect } from "react";
import CommentDeleteModal from "./DeleteCommentModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./CommentsPage.css";

function CommentsPage({ songId,song}) {

  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.comment);
  const currUser = useSelector((state) => state.session.user);
  const commentsArr = Object.values(allComments);

  useEffect(() => {
    dispatch(thunkGetAllComments(songId));
    return () => dispatch(clearState())
  }, [songId,currUser,song?.comments]);

  if (!commentsArr.length) return null;
  return (
    <div className="comments-main-cont">
      {commentsArr.map((comment) => (
        <div
          className={
            comment.user_id.id === currUser.id
              ? "single-comment-cont-h "
              : "single-comment-cont block"
          }
          key={comment.id}
        >
          <p>{comment.user_id.username}</p>
          {comment.user_id.id === currUser.id && (
            <div className="pencil-delete row click">
              <div
                className="edit-bttn click"
                // onClick={() => navigate(`/songs/edit/${song.id}`)}
              >
                <i className="fa-solid fa-pencil trans edit-pencil"></i>
              </div>
              <OpenModalButton
                modalComponent={<CommentDeleteModal id={comment.id} comments={song.comments} />}
                buttonText={
                  <i className="fa-solid fa-trash-can click trashcan trans"></i>
                }
              />
            </div>
          )}
          <div className="comment-text-cont">
            <p>{comment.comment_text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;
