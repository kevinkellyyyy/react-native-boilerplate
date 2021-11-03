import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import defaultStyles from '../Themes/styles';

function AppTextInput({ icon, width = '100%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && <FontAwesomeIcon icon={icon} size={15} style={styles.icon} />}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: '4%',
  },
  input: {
    width: '96%',
  },
});

export default AppTextInput;
