import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
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
import AppButton from '../Components/AppButton';
import routes from '../Navigation/routes';
import { useNavigation } from '@react-navigation/core';
import colors from '../Themes/colors';

const validationSchema = Yup.object().shape({
  user_login: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    ),
  password: Yup.string().required().min(8).label('Password'),
});

function ChangePasswordScreen(props, { navigation }) {
  const { navigate } = useNavigation();

  const auth = useAuth();
  // {data,loading,error,request}
  const loginPost = useApi(authApi.login);
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = async ({ user_login, password }) => {
    const result = await loginPost.request(user_login, password);
    if (!result.ok) {
      return setFailedLogin(true);
    }
    setFailedLogin(false);
    // save token
    auth.logIn(result.data.result);
  };

  return (
    <>
      <LoadingIndicator visible={loginPost.loading} />
      <View style={styles.container}>
        <Form
          initialValues={{ password: '', password_confirmation: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid Password and/or password confirmation."
            visible={failedLogin}
          />

          <FormField
            title="Kata Sandi"
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            eyeIcon
            placeholder="Password"
            textContentType="password"
          />

          <FormField
            title="Ulangi Kata Sandi"
            autoCapitalize="none"
            autoCorrect={false}
            name="password_confirmation"
            eyeIcon
            placeholder="Password"
            textContentType="password"
          />

          <SubmitButton style={{ borderRadius: 8 }} title="Simpan" />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  forgotPass: {
    color: colors.primary,
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'right',
  },
  register: {
    color: colors.primary,
    fontSize: 15,
    // textAlign: 'center',
  },
  clickRegister: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    color: colors.primary,
  },
  wrapperRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: -20,
    marginLeft: 10,
    marginBottom: 10,
  },
  logo: {
    width: 170,
    resizeMode: 'contain',
    height: 150,
    marginTop: -20,
    marginBottom: 20,
  },
});

export default ChangePasswordScreen;
