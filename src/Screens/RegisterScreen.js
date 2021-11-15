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
  name: Yup.string().required().label('Name'),
  password: Yup.string().required().min(8).label('Password'),
  password_confirmation: Yup.string()
    .required()
    .min(8)
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label('Password'),
  phone_number: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    )
    .label('Phone Number'),
  vendor_id: Yup.string().required('Pilih Gudang Mu'),
});

function RegisterScreen(props, { navigation }) {
  const { navigate } = useNavigation();

  const auth = useAuth();
  // {data,loading,error,request}
  const registerPost = useApi(authApi.register);
  const [failedLogin, setFailedLogin] = useState(false);
  const [error, setError] = useState();
  const [errortext, setErrortext] = useState('');

  const handleSubmit = async ({
    name,
    password,
    password_confirmation,
    phone_number,
    vendor_id,
  }) => {
    console.log(
      'test',
      name,
      password,
      password_confirmation,
      phone_number,
      vendor_id,
    );
    const result = await registerPost.request(
      name,
      password,
      password_confirmation,
      phone_number,
      vendor_id,
    );
    console.log('ini data', result.data);
    console.log('ini ok', result.ok);
    if (!result.ok) {
      setErrortext(result.data.result.message);
      return setError(true);
    }
    setError(false);
    // save token
    auth.register(result.data.result);
  };

  return (
    <>
      <LoadingIndicator visible={registerPost.loading} />

      <View style={styles.wrapperContainer}>
        <ScrollView style={styles.container}>
          <Form
            initialValues={{
              name: '',
              password: '',
              password_confirmation: '',
              phone_number: '',
              vendor_id: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={errortext} visible={error} />

            <Text style={styles.title}>Data Diri</Text>

            <FormField
              textInput
              title="Nama Lengkap"
              autoCorrect={false}
              name="name"
              placeholder="Name"
            />

            <FormField
              textInput
              title="No. HP"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              name="phone_number"
              placeholder="No. HP"
              // textContentType="emailAddress"
            />

            <FormField
              textInput
              style={{ opacity: 0.7, width: '90%' }}
              title="Password"
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              eyeIcon
              textContentType="password"
            />
            <FormField
              textInput
              style={{ opacity: 0.7, width: '90%' }}
              title="Password Confirmation"
              autoCapitalize="none"
              autoCorrect={false}
              eyeIcon
              name="password_confirmation"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              textContentType="password"
            />
            <FormField
              dropdown
              title="Vendor"
              autoCorrect={false}
              name="vendor_id"
            />
            <View style={{ marginTop: 100 }}>
              <SubmitButton style={{ borderRadius: 8 }} title="Daftar" />
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
});

export default RegisterScreen;
