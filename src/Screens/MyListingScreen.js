import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../Components/AppText';

function MyListingScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>My Listing Screen</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'tomato',
  },
});

export default MyListingScreen;
