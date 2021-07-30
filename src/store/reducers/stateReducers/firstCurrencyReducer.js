const firstCurrencyState = {
  first: "",
};

export const CHANGE_FIRST_STATE = "CHANGE_FIRST_STATE";

export function firstCurrencyReducer(state = firstCurrencyState, action) {
  switch (action.type) {
    case CHANGE_FIRST_STATE:
      return {
        first: action.payload.first,
      };
    default:
      return state;
  }
}

export const firstCurrencyCreator = (firstCurrency) => ({
  type: CHANGE_FIRST_STATE,
  payload: {
    first: firstCurrency,
  },
});
