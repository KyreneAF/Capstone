const GET_CURR_LIKED_SONGS = "likedSongs/get_curr_liked_songs"
const CREATE_LIKED_SONG = "likedSongs/create_liked_song"
const DELETE_LIKED_SONG = "likedSongs/delete_liked_song"
const CLEAR_STATE = "likedSongs/clear_state";

const getCurrLiked = (songs) =>{
    return {
        type: GET_CURR_LIKED_SONGS,
        songs
    }
}

const createLiked = (song,id) =>{
    return {
        type:CREATE_LIKED_SONG,
        song,
        id
    }
}

const deleteLiked = (id) =>{
    return{
        type:DELETE_LIKED_SONG,
        id
    }
}
export const clearState = () => {
    return {
      type: CLEAR_STATE,
    };
  };


export const thunkGetCurrLiked = (id) => async (dispatch) =>{
    const res = await fetch(`/api/liked_songs/${id}`);

    if(res.ok){
        const likedSongs = await res.json();
        dispatch(getCurrLiked(likedSongs));
        return likedSongs;
    } else{
        return {errors: "User has no liked songs"}
    }
}

export const thunkCreateLiked = (songId) => async(dispatch) => {
    const res = await fetch(`/api/liked_songs/${songId}`,{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(songId)
    });
    if(res.ok){
        const likedSongs = await res.json();
        dispatch(createLiked(likedSongs,likedSongs.id));
        return likedSongs
    } else {
        const errors = await res.json();
        return errors;
      }
}

export const thunkDeleteLiked = (songId) => async(dispatch) =>{
    const res = await fetch(`/api/liked_songs/${songId}`,{
        method: "DELETE",
        headers:{"Content-Type": "application/json" }
    })
    if(res.ok){
        const message = await res.json();
        return message
    } else {
        const error = await res.json();
        return error;
      }
}


function likedSongReducer(state = {}, action){
    switch (action.type){
        case GET_CURR_LIKED_SONGS:{
            let newState = {...state};
            action.songs.songs.forEach((song) => (newState[song.id] = song));
            return newState;
        }
        case CREATE_LIKED_SONG:{
            let newState = {...state};
            const likedSong = action.song;
            newState[action.id] = likedSong
            return newState
        }
        case DELETE_LIKED_SONG:{
            let newState = {...state};
            delete newState[action.id];
            return newState
        }
        case CLEAR_STATE:{
            return {}
        }
    default:
      return state;
    }
}

export default likedSongReducer
