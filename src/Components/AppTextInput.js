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
        secureTextEntry={eyeIcon ? showPass : false}
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    // padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: '4%',
    color: '#D5D5D5',
  },
  input: {
    width: '90%',
  },
});

export default AppTextInput;
