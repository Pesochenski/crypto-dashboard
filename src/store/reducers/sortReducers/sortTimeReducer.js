const initialSortedTimeState = {
  sortedTime: [],
};

export const SORT_TIME = "SORT_TIME";
export const SORT_TIME_SUCCESS = "SORT_TIME_SUCCESS";

export function sortTimeReducer(state = initialSortedTimeState, action) {
  switch (action.type) {
    case SORT_TIME:
      return { sortedTime: [] };
    case SORT_TIME_SUCCESS:
      return { sortedTime: action.payload };
    default:
      return state;
  }
}

export const sortTimeCreator = (array, type) => ({
  type: SORT_TIME,
  payload: { array: array, type: type },
});
export const sortTimeSuccessCreator = (payload) => ({
  type: SORT_TIME_SUCCESS,
  payload: payload,
});
