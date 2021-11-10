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
import DropDownPicker from 'react-native-dropdown-picker';
import LoadingIndicator from '../Components/LoadingIndicator';
import { useFormikContext } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
// import useApi from "../hooks/useApi";
// import LoadingIndicator from '../Components/LoadingIndicator';

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('Phone Number field is Required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid',
    ),
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  password_confirmation: Yup.string()
    .required()
    .min(8)
    .label('Password Confirmation'),
});

function RegisterScreen({ onChange }) {
  const registerPost = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [failedRegister, setFailedRegister] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'RetailKita Piyungan', value: 1 },
    { label: 'RetailKita Semarang', value: 7 },
    { label: 'RetailKita Minggir Sleman', value: 8 },
    { label: 'RetailKita Nanggulan', value: 9 },
    { label: 'RetailKita Ponjong', value: 10 },
    { label: 'RetailKita Sumber Harjo', value: 11 },
    { label: 'RetailKita Hasta Manunggal Mojolaban', value: 12 },
    { label: 'RetailKita Ngadirojo Wng', value: 13 },
    { label: 'RetailKita Kendal', value: 14 },
    { label: 'Toko RetailKita Piyungan', value: 157 },
  ]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleSubmit = async (
    userInfo,
    { name, phone_number, password, password_confirmation, vendor_id, tnc },
  ) => {
    console.log(handleSubmit);
    // alert('register button pressed');
    const result = await registerPost.request(
      name,
      phone_number,
      password,
      password_confirmation,
      vendor_id,
      tnc,
    );

    // if (!result.ok) {
    //   return setFailedRegister(true);
    // }
    // setFailedRegister(false);
    if (!result.ok) {
      if (result.data) {
        setError(result.data.error.response);
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
      <LoadingIndicator visible={registerPost.loading || loginApi.loading} />
      <View style={styles.container}>
        <Form
          initialValues={{
            name: 'awdad',
            phone_number: '088884476527',
            password: 'Qwerty12',
            password_confirmation: 'Qwerty12',
            vendor_id: 7,
            tnc: true,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error="Invalid Register" visible={failedRegister} />
          <Text style={styles.title}>Data Diri</Text>

          <FormField
            title="Nama Lengkap"
            autoCorrect={false}
            name="name"
            placeholder="Name"
          />

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

          <FormField
            title="Nama Lengkap"
            autoCorrect={false}
            name="vendor_id"
            placeholder="Name"
          />

          <FormField
            title="Nama Lengkap"
            autoCorrect={false}
            name="tnc"
            placeholder="Name"
          />

          <CheckBox
            name="tnc"
            disabled={false}
            color="blue"
            value={toggleCheckBox}
            onValueChange={value => {
              setToggleCheckBox(value);
              // onChange({ name: 'tnc', value });
            }}
          />
          {/* <DropDownPicker
            style={{
              backgroundColor: 'transparent',
              borderColor: 'gray',
              opacity: 0.7,
              borderRadius: 4,
            }}
            name="vendor_id"
            listMode={'SCROLLVIEW'}
            placeholderStyle={{ color: 'black' }}
            placeholder="Pilih Gudang"
            selectedItemLabelStyle={{ color: 'blue' }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // onChangeValue={
            //   value => setFieldValue(name, value)
            //   // onChange({ name: 'vendor_id', value });
            // }
          /> */}

          <SubmitButton style={{ borderRadius: 8 }} title="Daftar" />
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
