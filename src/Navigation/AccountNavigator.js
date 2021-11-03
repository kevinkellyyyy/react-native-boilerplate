import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyListingScreen from '../Screens/MyListingScreen';
import MyMessagesScreen from '../Screens/MyMessagesScreen';
import AccountScreen from '../Screens/AccountScreen';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="MyListing" component={MyListingScreen} />
      <Stack.Screen name="MyMessages" component={MyMessagesScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
