import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

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

function ForgotPassword({ title }) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    alert('register button pressed');
    const result = await registerApi.request(userInfo);

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
    //   userInfo.user_login,
    //   userInfo.password,
    // );
    // auth.logIn(authToken);
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
            vendor_id: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <Text>Data Diri</Text>

          <FormField
            title="No. HP"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            name="phone_number"
            placeholder="No. HP"
            // textContentType="emailAddress"
          />

          <FormField
            title="Password"
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="Password"
            eyeIcon
            textContentType="password"
          />
          <FormField
            title="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            eyeIcon
            name="password_confirmation"
            placeholder="Password Confirmation"
            textContentType="password"
          />
          <SubmitButton style={{ borderRadius: 8 }} title="Submit" />
        </Form>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
});

export default ForgotPassword;
