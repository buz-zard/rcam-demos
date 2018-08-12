import * as types from './actionTypes';

export const DEFAULT_STATE = {
  currency: 'USD',
};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case types.CHANGE_CURRENCY:
      return { ...state, currency: payload };
    default:
      return state;
  }
};
