import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonHome = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{ width: 400, height: 300, borderRadius: 15, marginTop: 40 }}
        />
        <View
          style={{ width: 400, height: 300, borderRadius: 15, marginTop: 40 }}
        />
        <View
          style={{ width: 400, height: 300, borderRadius: 15, marginTop: 40 }}
        />
        <View
          style={{ width: 400, height: 300, borderRadius: 15, marginTop: 40 }}
        />
        <View
          style={{ width: 400, height: 300, borderRadius: 15, marginTop: 40 }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     height: '100%',
//     opacity: 0.8,
//     width: '100%',
//     zIndex: 1,
//     elevation: 1,
//   },
// });

export default SkeletonHome;
