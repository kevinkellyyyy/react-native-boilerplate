import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../Components/AppText';

function InfoLinstoreScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Tentang Pos LINIStore</AppText>
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

export default InfoLinstoreScreen;
