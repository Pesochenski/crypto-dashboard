const forBtnInitialState = {
  loaded: false,
  error: false,
  first: {
    xArr: [],
    yArr: [],
  },
  second: {
    xArr: [],
    yArr: [],
  },
  third: {
    xArr: [],
    yArr: [],
  },
  fourth: {
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
        error: false,
        first: {
          xArr: [],
          yArr: [],
        },
        second: {
          xArr: [],
          yArr: [],
        },
        third: {
          xArr: [],
          yArr: [],
        },
        fourth: {
          xArr: [],
          yArr: [],
        },
      };
    case GET_FORBTN_SUCCESS:
      return {
        loaded: true,
        error: false,
        first: {
          xArr: action.payload.first.xArr,
          yArr: action.payload.first.yArr,
        },
        second: {
          xArr: action.payload.second.xArr,
          yArr: action.payload.second.yArr,
        },
        third: {
          xArr: action.payload.third.xArr,
          yArr: action.payload.third.yArr,
        },
        fourth: {
          xArr: action.payload.fourth.xArr,
          yArr: action.payload.fourth.yArr,
        },
      };
    case GET_FORBTN_ERROR:
      return {
        loaded: true,
        error: true,
        first: {
          xArr: [],
          yArr: [],
        },
        second: {
          xArr: [],
          yArr: [],
        },
        third: {
          xArr: [],
          yArr: [],
        },
        fourth: {
          xArr: [],
          yArr: [],
        },
      };
    default:
      return state;
  }
}

export const getForBtnCreator = (
  firstState,
  secondState,
  thirdState,
  fourthState
) => ({
  type: GET_FORBTN,
  payload: {
    first: firstState,
    second: secondState,
    third: thirdState,
    fourth: fourthState,
  },
});
export const getForBtnSuccessCreator = (payload) => ({
  type: GET_FORBTN_SUCCESS,
  payload: payload,
});
export const getForBtnErrorCreator = () => ({ type: GET_FORBTN_ERROR });
