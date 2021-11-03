import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

import HomeScreen from '../Screens/HomeScreen';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
