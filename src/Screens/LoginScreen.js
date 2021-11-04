import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as Yup from 'yup';
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

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

const validationSchema = Yup.object().shape({
  user_login: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    ),
  password: Yup.string().required().min(8).label('Password'),
});

function LoginScreen(props) {
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
        <Image
          style={styles.logo}
          source={require('../Assets/linistore-logo.png')}
        />

        <Form
          initialValues={{ user_login: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid no.Hp and/or password."
            visible={failedLogin}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={faPhone}
            keyboardType="numeric"
            name="user_login"
            placeholder="No. HP"
            // textContentType="numeric"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={faLock}
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
