import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import SkeletonHome from '../Components/Home/SkeletonHome';
import AppButton from '../Components/AppButton';
import Card from '../Components/Card';
import colors from '../Themes/colors';
import listingsApi from '../Services/listings';
import AppText from '../Components/AppText';
import useApi from '../Hooks/useApi';
import useLocation from '../Hooks/useLocation';

function HomeScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  // for testing only
  const location = useLocation();
  console.log(location, '>>>>>>>>>>>> location');

  useEffect(() => {
    getListingsApi.request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {getListingsApi.loading ? (
        <SkeletonHome />
      ) : (
        <View style={styles.screen}>
          {getListingsApi.error && (
            <>
              <AppText>Couldn't retrieve the listings.</AppText>
              <AppButton title="Retry" onPress={getListingsApi.request} />
            </>
          )}
          <FlatList
            data={getListingsApi.data}
            keyExtractor={listing => listing.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.tagline}
                subTitle={item.description}
                imageUrl={item.image_url}
                onPress={() => console.log(`item ${item.id} is pressed`)}
                // resizeMode="cover"
              />
            )}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
