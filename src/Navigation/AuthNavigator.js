import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import ForgotPassword from '../Screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    /> */}
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={LoginScreen}
    />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Lupa Kata Sandi" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthNavigator;
