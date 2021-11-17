import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import * as Yup from 'yup';

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../Components/forms';
import authApi from '../Services/auth';
import useAuth from '../Auth/useAuth';
import LoadingIndicator from '../Components/LoadingIndicator';
import useApi from '../Hooks/useApi';
import { useNavigation } from '@react-navigation/core';
import AppButton from '../Components/AppButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormikContext } from 'formik';

const validationSchema = Yup.object().shape({
  user_login: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    )
    .label('Phone Number'),
  password: Yup.string().required('Password Harus diisi').min(8),
  password_confirmation: Yup.string()
    .required('Ulangi Kata Sandi Baru Harus diisi')
    .min(8)
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function ForgotPasswordScreen(props, { navigation }) {
  const { navigate } = useNavigation();

  const auth = useAuth();
  // {data,loading,error,request}
  const forgotPassPost = useApi(authApi.forgotPass);
  const [failedLogin, setFailedLogin] = useState(false);
  const [error, setError] = useState();
  const [errortext, setErrortext] = useState('');

  const handleSubmit = async ({
    user_login,
    password,
    password_confirmation,
  }) => {
    console.log('test', user_login, password, password_confirmation);
    const result = await forgotPassPost.request(
      user_login,
      password,
      password_confirmation,
    );
    console.log('ini data', result.data);
    console.log('ini ok', result.ok);
    if (!result.ok) {
      setErrortext(result.data.result.message);
      return setError(true);
    }
    setError(false);
    // save token
    auth.forgotPassword(result.data.result);
  };

  return (
    <>
      <LoadingIndicator visible={forgotPassPost.loading} />
      <View style={styles.wrapperContainer}>
        <ScrollView style={styles.container}>
          <Form
            initialValues={{
              user_login: '',
              password: '',
              password_confirmation: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={errortext} visible={error} />

            <FormField
              textInput
              title="No. HP"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              name="user_login"
              placeholder="No. HP"
              // textContentType="emailAddress"
            />

            <FormField
              style={{ opacity: 0.6, width: '90%', fontSize: 18 }}
              textInput
              title="Kata Sandi Baru"
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              eyeIcon
              textContentType="password"
            />
            <FormField
              style={{ opacity: 0.6, width: '90%', fontSize: 18 }}
              textInput
              title="Ulangi Kata Sandi"
              autoCapitalize="none"
              autoCorrect={false}
              eyeIcon
              name="password_confirmation"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              textContentType="password"
            />
            <View style={styles.wrapperButton}>
              <SubmitButton style={{ borderRadius: 8 }} title="Submit" />
            </View>
          </Form>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  wrapperButton: {
    marginTop: 260,
  },
});

export default ForgotPasswordScreen;
