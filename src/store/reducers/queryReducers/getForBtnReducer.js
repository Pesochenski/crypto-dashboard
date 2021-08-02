const forBtnInitialState = {
  loaded: false,
  first: {
    error: false,
    xArr: [],
    yArr: [],
  },
  second: {
    error: false,
    xArr: [],
    yArr: [],
  },
  third: {
    error: false,
    xArr: [],
    yArr: [],
  },
  fourth: {
    error: false,
    xArr: [],
    yArr: [],
  },
};

export const GET_FORBTN = "GET_FORBTN";
export const GET_FORBTN_SUCCESS = "GET_FORBTN_SUCCESS";
export const GET_FORBTN_ERROR = "GET_FORBTN_ERROR";

export function getForBtnReducer(state = forBtnInitialState, action) {
  switch (action.type) {
    case GET_FORBTN:
      return {
        loaded: false,
        first: {
          error: false,
          xArr: [],
          yArr: [],
        },
        second: {
          error: false,
          xArr: [],
          yArr: [],
        },
        third: {
          error: false,
          xArr: [],
          yArr: [],
        },
        fourth: {
          error: false,
          xArr: [],
          yArr: [],
        },
      };
    case GET_FORBTN_SUCCESS:
      return {
        loaded: true,
        error: false,
        first: {
          xArr: action.payload[0].xArr,
          yArr: action.payload[0].yArr,
        },
        second: {
          xArr: action.payload[1]?.xArr,
          yArr: action.payload[1]?.yArr,
        },
        third: {
          xArr: action.payload[2]?.xArr,
          yArr: action.payload[2]?.yArr,
        },
        fourth: {
          xArr: action.payload[3]?.xArr,
          yArr: action.payload[3]?.yArr,
        },
      };
    default:
      return state;
  }
}

export const getForBtnCreator = () => ({ type: GET_FORBTN });
export const getForBtnSuccessCreator = (payload) => ({
  type: GET_FORBTN_SUCCESS,
  payload: payload,
});
