const forBtnInitialState = {
  loaded: false,
  error: false,
  xArr: [],
  yArr: [],
};

export const GET_FORBTN = "GET_FORBTN";
export const GET_FORBTN_SUCCESS = "GET_FORBTN_SUCCESS";
export const GET_FORBTN_ERROR = "GET_FORBTN_ERROR";

export function getForBtnReducer(state = forBtnInitialState, action) {
  switch (action.type) {
    case GET_FORBTN:
      return {
        loaded: false,
        error: false,
        xArr: [],
        yArr: [],
      };
    case GET_FORBTN_SUCCESS:
      return {
        loaded: true,
        error: false,
        xArr: action.payload.xArr,
        yArr: action.payload.yArr,
      };
    case GET_FORBTN_ERROR:
      return {
        loaded: true,
        error: true,
        xArr: [],
        yArr: [],
      };
    default:
      return state;
  }
}

export const getForBtnCreator = (firstState) => ({
  type: GET_FORBTN,
  payload: { first: firstState },
});
export const getForBtnSuccessCreator = (payload) => ({
  type: GET_FORBTN_SUCCESS,
  payload: payload,
});
export const getForBtnErrorCreator = () => ({ type: GET_FORBTN_ERROR });
