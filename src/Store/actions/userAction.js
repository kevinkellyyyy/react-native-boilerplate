import { SETUSER } from './index';

export const setUser = value => {
  return {
    type: SETUSER,
    payload: value,
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(setUser(null));
  };
};

// -hit api from services
// -save to store { data , loading , error }
// -bikin contoh get sm post (pakai onprogress)
