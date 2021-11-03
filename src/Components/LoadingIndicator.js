import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Text } from 'react-native';

function LoadingIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../Assets/animations/890-loading-animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    opacity: 0.8,
    width: '100%',
    zIndex: 1,
    elevation: 1,
  },
});

export default LoadingIndicator;
