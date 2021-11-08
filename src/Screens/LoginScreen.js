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
            title="Kata Sandi"
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            eyeIcon
            placeholder="Password"
            textContentType="password"
          />
          <TouchableOpacity onPress={() => navigate('Forgot Password')}>
            <Text style={styles.forgotPass}>Lupa Kata Sandi ?</Text>
          </TouchableOpacity>

          <SubmitButton style={{ borderRadius: 8 }} title="Masuk" />

          <View style={styles.wrapperRegister}>
            <Text style={styles.register}>Belum Punya Akun? </Text>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text style={styles.clickRegister}> Daftar disini</Text>
            </TouchableOpacity>
          </View>
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

export default LoginScreen;
