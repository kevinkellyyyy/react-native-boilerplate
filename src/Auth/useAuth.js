import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import { logout, setUser } from '../Store/actions/userAction';
import authStorage from './storage';

const useAuth = () => {
  const { user } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  const logIn = authToken => {
    // decode to read authToken
    const userData = jwtDecode(authToken);

    // save userData to redux
    dispatch(setUser(userData));

    // save token with sequre storage
    authStorage.storeToken(authToken);
  };

  const register = authToken => {
    const userData = jwtDecode(authToken);

    // save userData to redux
    dispatch(setUser(userData));

    // save token with sequre storage
    authStorage.storeToken(authToken);
  };

  const forgotPassword = authToken => {
    const userData = jwtDecode(authToken);

    // save userData to redux
    dispatch(setUser(userData));

    // save token with sequre storage
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    // setUser1(null);
    dispatch(logout());
    authStorage.removeToken();
  };

  return { user, logIn, register, logOut, forgotPassword };
};

export default useAuth;
