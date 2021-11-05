import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import defaultStyles from '../Themes/styles';
import colors from '../Themes/colors';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function AppTextInput({ icon, eyeIcon, width = '100%', ...otherProps }) {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={[styles.container]}>
      {icon && <FontAwesomeIcon icon={icon} size={15} style={styles.icon} />}

      <TextInput
        secureTextEntry={showPass}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
      />
      {icon && <FontAwesomeIcon icon={icon} size={15} style={styles.icon} />}
      {eyeIcon && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <FontAwesomeIcon
            icon={showPass ? faEye : faEyeSlash}
            size={20}
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
    width: '90%',
  },
});

export default AppTextInput;
