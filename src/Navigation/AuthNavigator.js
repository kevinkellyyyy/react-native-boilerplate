import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import ForgotPassword from '../Screens/ForgotPasswordScreen';
import VerificationScreen from '../Screens/VerificationScreen';

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
    <Stack.Screen
      name="Register"
      options={{
        title: 'Daftar',
        headerShadowVisible: false,
      }}
      component={RegisterScreen}
    />
    <Stack.Screen
      name="Verification"
      options={{
        title: 'Verifikasi Akun',
        headerShadowVisible: false,
      }}
      component={VerificationScreen}
    />
    <Stack.Screen
      name="Forgot Password"
      options={{
        title: 'Lupa Kata Sandi',
        headerShadowVisible: false,
      }}
      component={ForgotPassword}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
