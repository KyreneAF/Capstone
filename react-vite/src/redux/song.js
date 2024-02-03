const GET_ALL_SONGS = "songs/get_all_songs";
const GET_CURR_SONGS = "songs/get_curr_songs";
const CREATE_SONG = "songs/create_song";
const UPDATE_SONG = "songs/update_song";
const DELETE_SONG = "songs/delete_song";
const CLEAR_STATE = "songs/clear_state";

const getAllSongs = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};
const getCurrSongs = (songs) => {
  return {
    type: GET_CURR_SONGS,
    songs,
  };
};
const createSong = (song) => {
  return {
    type: CREATE_SONG,
    song,
  };
};
const updateSong = (song) => {
  return {
    type: UPDATE_SONG,
    song,
  };
};
const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId,
  };
};
export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const thunkGetAllSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs/");

  if (res.ok) {
    const songs = await res.json();
    dispatch(getAllSongs(songs));
    return songs;
  } else {
    return { errors: "Couldn't get all songs" };
  }
};
export const thunkGetCurrSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs/current");

  if (res.ok) {
    const songs = await res.json();

    dispatch(getCurrSongs(songs));
    return songs;
  } else {
    return { errors: "Couldn't get all songs of current user" };
  }
};
export const thunkCreateSong = (newSong) => async (dispatch) => {
  const res = await fetch("/api/songs/new", {
    method: "POST",
    // headers: {"Content-Type": "multipart/form-data"},
    body: newSong, //JSON.stringify(newSong)
  });

  if (res.ok) {
    const createdSong = await res.json();

    dispatch(createSong(createdSong));

    return createdSong;
  } else {
    const errors = await res.json();
    return errors;
  }
};
export const thunkUpdateSong = (song, id) => async (dispatch) => {
  console.log(song, "in thunk");
  const res = await fetch(`/api/songs/${id}/edit`, {
    method: "PUT",
    // headers: {"Content-Type": "application/json"},
    body: song, //JSON.stringify(song)
  });
  if (res.ok) {
    const updatedSong = await res.json();
    dispatch(updateSong(updatedSong));
    return updatedSong;
  } else {
    const errors = await res.json();
    return errors;
  }
};
export const thunkDeleteSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    const message = await res.json();
    dispatch(deleteSong(songId));
    return message;
  } else {
    const error = await res.json();
    return error;
  }
};

function songReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SONGS: {
      let newState = { ...state };
      action.songs.songs.forEach((song) => (newState[song.id] = song));
      return newState;
    }
    case GET_CURR_SONGS: {
      let newState = { ...state };
      action.songs.songs.forEach((song) => (newState[song.id] = song));
      return newState;
    }
    case CREATE_SONG: {
      const song = action.song.song;
      const newState = { ...state };
      newState[song.id] = song;
      return newState;
    }
    case UPDATE_SONG: {
      const song = action.song.song;
      let newState = { ...state };
      newState[song.id] = song;
      return newState;
    }
    case DELETE_SONG: {
      let newState = { ...state };
      delete newState[action.songId];
      return newState;
    }
    case CLEAR_STATE: {
      return {};
    }
    default:
      return state;
  }
}

export default songReducer;
