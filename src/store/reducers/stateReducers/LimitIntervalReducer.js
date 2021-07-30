const limitIntervalState = {
  first: "",
};

export const LIMIT_INTERVAL_STATE = "LIMIT_INTERVAL_STATE";

export function limitIntervalReducer(state = limitIntervalState, action) {
  switch (action.type) {
    case LIMIT_INTERVAL_STATE:
      return {
        stateLimit: action.payload.stateLimit,
        stateInterval: action.payload.stateInterval,
      };
    default:
      return state;
  }
}

export const limitIntervalCreator = (stateLimit, stateInterval) => ({
  type: LIMIT_INTERVAL_STATE,
  payload: {
    stateLimit: stateLimit,
    stateInterval: stateInterval,
  },
});
