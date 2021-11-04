import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import AppContainer from './Navigation/AppContainer';
import store from './Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
