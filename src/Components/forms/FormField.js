import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import { StyleSheet, Text } from 'react-native';

function AppFormField({ name, title, width, eyeIcon, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={text => setFieldValue(name, text)}
        value={values[name]}
        eyeIcon={eyeIcon}
        width={width}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '500', paddingLeft: 10 },
});

export default AppFormField;
