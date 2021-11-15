import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from '../Screens/AccountScreen';
import ChangePasswordScreen from '../Screens/ChangePasswordScreen';
import PrivacyPolicyScreen from '../Screens/PrivacyPolicyScreen';
import InfoLinstoreScreen from '../Screens/InfoLinistoreScreen';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen
        name="ChangePassword"
        options={{
          title: 'Ubah Kata Sandi',
        }}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        options={{
          title: 'Kebijakan Privasi',
        }}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="InfoLinistore"
        options={{
          title: 'Tentang LINISTORE POS',
        }}
        component={InfoLinstoreScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
