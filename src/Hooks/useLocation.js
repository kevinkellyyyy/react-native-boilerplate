import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  request,
} from 'react-native-permissions';
import { Platform } from 'react-native';

const useLocation = () => {
  const [location, setLocation] = useState();
  try {
    const getLocation = async () => {
      const requestResult = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      console.log(requestResult, ' request');

      const result = await check(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      console.log(result, '>>>>>>> check');

      switch (result) {
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setLocation({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              });
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
          break;
      }
    };

    useEffect(() => {
      getLocation();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return location;
  } catch (error) {
    console.log(error, 'error');
  }
};

export default useLocation;
