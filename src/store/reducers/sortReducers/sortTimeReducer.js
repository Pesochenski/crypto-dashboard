const initialSortedTimeState = {
  sortedTime: [],
  sortedX: [],
  sortedLines: [],
};

export const SORT_TIME = "SORT_TIME";
export const SORT_TIME_SUCCESS = "SORT_TIME_SUCCESS";

export function sortTimeReducer(state = initialSortedTimeState, action) {
  switch (action.type) {
    case SORT_TIME:
      return { sortedTime: [], sortedX: [], sortedLines: [] };
    case SORT_TIME_SUCCESS:
      return {
        sortedTime: action.payload.outputTime,
        sortedX: action.payload.outputX,
        sortedLines: action.payload.outputLines,
      };
    default:
      return state;
  }
}

export const sortTimeCreator = (arrayTime, arrayX, type) => ({
  type: SORT_TIME,
  payload: { array: arrayTime, arrayX: arrayX, type: type },
});
export const sortTimeSuccessCreator = (payload) => ({
  type: SORT_TIME_SUCCESS,
  payload: payload,
});
