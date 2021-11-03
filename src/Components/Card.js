import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import AppText from './AppText';
import colors from '../Themes/colors';
import AppButton from './AppButton';

function Card({
  title,
  subTitle,
  imageUrl,
  onPress,
  buttonPress,
  buttonTitle,
  resizeMode = 'contain',
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode={resizeMode}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
        {buttonTitle && (
          <View style={styles.button}>
            <AppButton title={buttonTitle} onPress={buttonPress} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
