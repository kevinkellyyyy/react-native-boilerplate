import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import {
  faEnvelope,
  faUser,
  faLock,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

// import usersApi from "../api/users";
// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../Components/forms';
import authApi from '../Services/auth';
import usersApi from '../Services/users';
import useApi from '../Hooks/useApi';
import useAuth from '../Auth/useAuth';
// import useApi from "../hooks/useApi";
// import LoadingIndicator from '../Components/LoadingIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    alert('register button pressed');
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) {
        setError(result.data.error);
      } else {
        setError('An unexpected error occurred.');
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.user_login,
      userInfo.password,
    );
    auth.logIn(authToken);
  };

  return (
    <>
      {/* <LoadingIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <View style={styles.container}>
        <Form
          initialValues={{
            name: '',
            password: '',
            password_confirmation: '',
            phone_number: '',
            tnc: false,
            vendor_id: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon={faUser}
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={faPhone}
            keyboardType="numeric"
            name="phone_number"
            placeholder="No. HP"
            // textContentType="emailAddress"
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
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={faLock}
            name="password_confirmation"
            placeholder="Password Confirmation"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default RegisterScreen;
