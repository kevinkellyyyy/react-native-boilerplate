import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import defaultStyles from '../Themes/styles';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function AppTextInput({ icon, width = '100%', eyeIcon, ...otherProps }) {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={[styles.container, { width }]}>
      {icon && <FontAwesomeIcon icon={icon} size={15} style={styles.icon} />}
      <TextInput
        secureTextEntry={showPass}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
      {eyeIcon && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <FontAwesomeIcon
            icon={showPass ? faEye : faEyeSlash}
            size={15}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
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
    width: '80%',
  },
});

export default AppTextInput;
