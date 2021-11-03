import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import AppText from './AppText';
import colors from '../Themes/colors';

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    elevation: 1,
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
