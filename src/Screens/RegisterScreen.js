import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

// import usersApi from "../api/users";
// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../Components/forms';
// import useApi from "../hooks/useApi";
// import LoadingIndicator from '../Components/LoadingIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen() {
  // const registerApi = useApi(usersApi.register);
  // const loginApi = useApi(authApi.login);
  // const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    alert('register button pressed');
    // const result = await registerApi.request(userInfo);

    // if (!result.ok) {
    //   if (result.data) {
    //     setError(result.data.error);
    //   } else {
    //     setError('An unexpected error occurred.');
    //     console.log(result);
    //   }
    //   return;
    // }

    // const { data: authToken } = await loginApi.request(
    //   userInfo.email,
    //   userInfo.password,
    // );
    // auth.logIn(authToken);
  };

  return (
    <>
      {/* <LoadingIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <View style={styles.container}>
        <Form
          initialValues={{ name: '', email: '', password: '' }}
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
