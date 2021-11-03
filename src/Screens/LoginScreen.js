import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as Yup from 'yup';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

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
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
  const auth = useAuth();
  // {data,loading,error,request}
  const loginPost = useApi(authApi.login);
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await loginPost.request(email, password);
    if (!result.ok) {
      return setFailedLogin(true);
    }
    setFailedLogin(false);
    // save token
    auth.logIn(result.data.response);
  };

  return (
    <>
      <LoadingIndicator visible={loginPost.loading} />
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../Assets/logo-red.png')} />

        <Form
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={failedLogin}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={faEnvelope}
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
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
