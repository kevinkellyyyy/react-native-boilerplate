import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../Themes/colors';
import AppText from './AppText';

function AppButton({ title, onPress, color = 'primary', style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 15,
    // width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    // textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;
