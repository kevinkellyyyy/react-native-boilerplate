import React, { useState } from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import { StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function AppFormField({
  textInput,
  dropdown,
  name,
  title,
  width,
  eyeIcon,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'RetailKita Piyungan', value: '1' },
    { label: 'RetailKita Semarang', value: '7' },
    { label: 'RetailKita Minggir Sleman', value: '8' },
    { label: 'RetailKita Nanggulan', value: '9' },
    { label: 'RetailKita Ponjong', value: '10' },
    { label: 'RetailKita Sumber Harjo', value: '11' },
    { label: 'RetailKita Hasta Manunggal Mojolaban', value: '12' },
    { label: 'RetailKita Ngadirojo Wng', value: '13' },
    { label: 'RetailKita Kendal', value: '14' },
    { label: 'Toko RetailKita Piyungan', value: '157' },
  ]);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {textInput && (
        <AppTextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={text => setFieldValue(name, text)}
          value={values[name]}
          eyeIcon={eyeIcon}
          width={width}
          {...otherProps}
        />
      )}
      {dropdown && (
        <DropDownPicker
          style={{
            backgroundColor: 'transparent',
            borderColor: 'gray',
            opacity: 0.7,
            borderRadius: 4,
          }}
          name="vendor_id"
          onPress={() => setFieldTouched('vendor_id')}
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
          onChangeValue={value => setFieldValue('vendor_id', value)}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '500', paddingLeft: 10 },
});

export default AppFormField;
