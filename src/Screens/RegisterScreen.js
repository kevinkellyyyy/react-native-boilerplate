import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
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
  password_confirmation: Yup.string().required().min(8).label('Password'),
  phone_number: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    )
    .label('Phone Number'),
  vendor_id: Yup.string().required('Pilih Gudang'),
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
      <View style={styles.container}>
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
            title="Password"
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="Password"
            eyeIcon
            textContentType="password"
          />
          <FormField
            textInput
            title="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            eyeIcon
            name="password_confirmation"
            placeholder="Password Confirmation"
            textContentType="password"
          />
          <FormField
            dropdown
            title="Vendor"
            autoCorrect={false}
            name="vendor_id"
          />

          {/* <CheckBox
  name="tnc"
  disabled={false}
  color="blue"
  value={toggleCheckBox}
  onValueChange={value => {
    setToggleCheckBox(value);
    // onChange({ name: 'tnc', value });
  }}
/> */}

          <SubmitButton style={{ borderRadius: 8 }} title="Masuk" />
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
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
    paddingBottom: 20,
  },
});

export default RegisterScreen;
