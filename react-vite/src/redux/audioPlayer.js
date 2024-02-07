const SET_CURR_AUDIO = "audio/set_curr_audio";
const PAUSE_CURR_AUDIO = "audio/pause_curr_audio";
const CLEAR_STATE_AUDIO = "audio/clear_state_AUDIO";

export const setCurrAudio = (songId, audioFile) => {
  return {
    type: SET_CURR_AUDIO,
    songId,
    audioFile,
  };
};
export const pauseCurrAudio = (status) => {
  return {
    type:PAUSE_CURR_AUDIO,
    status,
  };
};
export const clearStateAudio = () => {
  return {
    type: CLEAR_STATE_AUDIO,
  };
};

function audioReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURR_AUDIO: {
      let newState = { ...state };
      newState[1] = action.audioFile;
      return newState;
    }
    case PAUSE_CURR_AUDIO:
      return {
        ...state,
        isPlaying: action.status,
      };
    case CLEAR_STATE_AUDIO: {
      return {};
    }
    default:
      return state;
  }
}

export default audioReducer;
