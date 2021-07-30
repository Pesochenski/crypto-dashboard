const secondCurrencyState = {
  second: "",
};

export const CHANGE_SECOND_STATE = "CHANGE_SECOND_STATE";

export function secondCurrencyReducer(state = secondCurrencyState, action) {
  switch (action.type) {
    case CHANGE_SECOND_STATE:
      return {
        second: action.payload.second,
      };
    default:
      return state;
  }
}

export const secondCurrencyCreator = (secondCurrency) => ({
  type: CHANGE_SECOND_STATE,
  payload: {
    second: secondCurrency,
  },
});
