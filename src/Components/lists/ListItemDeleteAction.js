import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import colors from '../../Themes/colors';

function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <FontAwesomeIcon icon={faTrash} size={35} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default ListItemDeleteAction;
