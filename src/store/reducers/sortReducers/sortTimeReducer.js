const initialSortedTimeState = {
  sortedTime: [],
};

export const SORT_MINUTES = "SORT_MINUTES";
export const SORT_HOURS = "SORT_HOURS";
export const SORT_DAYS = "SORT_DAYS";
export const SORT_TIME_SUCCESS = "SORT_TIME_SUCCESS";

export function sortTimeReducer(state = initialSortedTimeState, action) {
  switch (action.type) {
    case SORT_MINUTES:
      return { sortedTime: [] };
    case SORT_HOURS:
      return { sortedTime: [] };
    case SORT_DAYS:
      return { sortedTime: [] };
    case SORT_TIME_SUCCESS:
      return { sortedTime: action.payload };
    default:
      return state;
  }
}

export const sortMinutesCreator = (array) => ({
  type: SORT_MINUTES,
  payload: array,
});
export const sortHoursCreator = (array) => ({
  type: SORT_HOURS,
  payload: array,
});
export const sortDaysCreator = (array) => ({ type: SORT_DAYS, payload: array });
export const sortTimeSuccessCreator = (payload) => ({
  type: SORT_TIME_SUCCESS,
  payload: payload,
});
