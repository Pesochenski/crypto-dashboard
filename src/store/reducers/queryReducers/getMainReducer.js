const initialMainState = {
  loaded: false,
  error: false,
  xArr: [],
  yArr: [],
  time: [],
};

export const GET_MAIN = "GET_MAIN";
export const GET_MAIN_SUCCESS = "GET_MAIN_SUCCESS";
export const GET_MAIN_ERROR = "GET_MAIN_ERROR";

export function getMainReducer(state = initialMainState, action) {
  switch (action.type) {
    case GET_MAIN:
      return {
        loaded: false,
        error: false,
        xArr: [],
        yArr: [],
        time: [],
      };
    case GET_MAIN_SUCCESS:
      return {
        loaded: true,
        error: false,
        xArr: action.payload.xArr,
        yArr: action.payload.yArr,
        time: action.payload.time,
      };
    case GET_MAIN_ERROR:
      return {
        loaded: true,
        error: true,
        xArr: [],
        yArr: [],
        time: [],
      };
    default:
      return state;
  }
}

export const getMainCreator = (firstState, secondState, interval, limit) => ({
  type: GET_MAIN,
  payload: {
    first: firstState,
    second: secondState,
    limit: limit,
    interval: interval,
  },
});
export const getMainSuccessCreator = (payload) => ({
  type: GET_MAIN_SUCCESS,
  payload: payload,
});
export const getMainErrorCreator = () => ({ type: GET_MAIN_ERROR });
