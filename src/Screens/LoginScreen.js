import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import {
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

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

const validationSchema = Yup.object().shape({
  user_login: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    ),
  password: Yup.string().required().min(8).label('Password'),
});

function LoginScreen(props, { navigation }) {
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
        <Image
          style={styles.logo}
          source={require('../Assets/launch_screen.png')}
        />

        <Text style={styles.title}>Masuk</Text>

        <Form
          initialValues={{ user_login: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid no.Hp and/or password."
            visible={failedLogin}
          />
          <FormField
            title="No.Hp"
            maxLength={15}
            autoCapitalize="none"
            autoCorrect={false}
            // icon={faPhone}
            keyboardType="numeric"
            name="user_login"
            placeholder="No. HP"
            // textContentType="numeric"
          />

          <FormField
            title="Password"
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            eyeIcon
            placeholder="Password"
            textContentType="password"
          />
          <SubmitButton title="Login" />
          <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigate('Register')}
          />
          <AppButton
            title="Lupa Kata Sandi"
            color="primary"
            onPress={() => navigate('Lupa Kata Sandi')}
          />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  phone_number: { fontSize: 18, fontWeight: '500', paddingLeft: 10 },
  password: { fontSize: 18, fontWeight: '500', paddingLeft: 10 },

  container: {
    padding: 10,
    // flex: 1,
    backgroundColor: 'white',
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

export default LoginScreen;
