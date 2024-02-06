

const GET_ALL_COMMENTS = "comments/get_all_comments";
const CREATE_COMMENT = "comments/create_song";
const UPDATE_COMMENT = "comments/update_song";
const DELETE_COMMENT = "comments/delete_song";
const CLEAR_STATE = "comments/clear_state"

const getAllComments = (comments) =>{
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
}
const createComment = (comment, commentId) =>{
    return {
        type:CREATE_COMMENT,
        comment,
        commentId
    }
}
const updateComment = (comment, commentId) =>{
    return {
        type:UPDATE_COMMENT,
        comment,
        commentId
    }

}
const deleteComment = (commentId) =>{
    type:DELETE_COMMENT,
    commentId
}
export const clearState = () =>{
    return {
        type:CLEAR_STATE
    }
}

export const thunkGetAllComments = (songId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${songId}`);

        if (res.ok) {
            const comments = await res.json();
            dispatch(getAllComments(comments));
            return comments;
        } else {
            const errors = await res.json();
            return { errors: errors };
        }
    } catch (error) {
        console.error("An error occurred while fetching comments:", error);
        return { errors: ["An error occurred while fetching comments."] };
    }
};

export const thunkCreateComment = (comment,songId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${songId}/new`,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        });

        if (res.ok) {
            const comment = await res.json();
            dispatch(createComment(comment,comment.id));
            return comment;
        } else {
            const errors = await res.json();
            return { errors: errors };
        }
    } catch (error) {
        console.error("An error occurred while fetching comments:", error);
        return { errors: ["An error occurred while fetching comments."] };
    }
};

export const thunkUpdateComment = (updatedComment,commentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${commentId}/edit`,{
            method:"PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedComment)
        });

        if (res.ok) {
            const comment = await res.json();
            dispatch(updateComment(comment,comment.id));
            return comment;
        } else {
            const errors = await res.json();
            return { errors: errors };
        }
    } catch (error) {
        console.error("An error occurred while fetching comments:", error);
        return { errors: ["An error occurred while fetching comments."] };
    }
};

export const thunkDeleteComment = (comment_id) => async (dispatch) => {
    try {
        console.log('COMMENTS IN THUNK', comment_id)
    const res = await fetch(`/api/comments/${comment_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const comment = await res.json();
      dispatch(deleteComment(comment_id));
      return comment;
    } else {
      const error = await res.json();
      return error;
    }
    } catch (error) {
    console.error("An error occurred while fetching comments:", error);
    }
  };




function commentReducer(state = {}, action){
    switch(action.type){
        case CLEAR_STATE:{
            return {}
        }
        case GET_ALL_COMMENTS: {
            let newState = { ...state };
            console.log("action", action.comments)
            action.comments.comments.forEach((comment) => (newState[comment.id] = comment));
            return newState;
          }
          case CREATE_COMMENT: {
            const comment = action.comment.comment;
            const newState = { ...state };
            newState[comment.id] = comment;
            return newState;
          }
          case UPDATE_COMMENT: {
            const comment = action.comment.comment;
            let newState = { ...state };
            newState[comment.id] = comment;
            return newState;
          }
          case DELETE_COMMENT: {
            let newState = { ...state };
            delete newState[action.commentId];
            return newState;
          }
        default:
            return state;
    }
}

export default commentReducer
