import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function Icon({
  name,
  size = 40,
  backgroundColor = '#000',
  iconColor = '#fff',
}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FontAwesomeIcon icon={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
