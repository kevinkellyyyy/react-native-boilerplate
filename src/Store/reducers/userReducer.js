import { SETUSER } from '../actions/index';

const initialState = {
  user: null,
};

export default function trackingReducer(state = initialState, action) {
  switch (action.type) {
    case SETUSER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
