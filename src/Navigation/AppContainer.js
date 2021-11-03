import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { navigationRef } from './rootNavigation';
import authStorage from '../Auth/storage';
import { setUser } from '../Store/actions/userAction';
import OfflineNotice from '../Components/OfflineNotice';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AppContainer = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const restoreUser = async () => {
    // get user from sequre storage for auto login
    const userData = await authStorage.getUser();
    if (userData) {
      dispatch(setUser(userData));
    }
  };

  useEffect(() => {
    restoreUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
