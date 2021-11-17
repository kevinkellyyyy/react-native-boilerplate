import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import AppButton from '../Components/AppButton';
import colors from '../Themes/colors';

function VerificationScreen(props, { navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperLogo}>
          <Image
            style={styles.logo}
            source={require('../Assets/verification.png')}
          />
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.title}>Masukan Kode Verifikasi</Text>

          <Text style={styles.subTitle}>
            Masukan Kode Verifikasi dari SMS yang kamu terima
          </Text>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>_ _ _ _ _ _</Text>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Belum Menerima SMS?{' '}
          <Text style={{ color: colors.primary, fontWeight: '600' }}>
            Kirim Ulang
          </Text>
        </Text>

        <AppButton title="Selanjutnya" />
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
  wrapperText: { marginTop: -80 },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },

  subTitle: {
    fontSize: 20,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  logo: {
    margin: 98,
    width: 180,
    height: 159,
  },
});

export default VerificationScreen;
