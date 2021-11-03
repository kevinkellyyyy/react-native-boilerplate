// import React from 'react';

// export const navigationRef = React.createRef();

// const navigate = (name, params) =>
//   navigationRef.current?.navigate(name, params);

// export default {
//   navigate,
// };

// ==================

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const navigation = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export default {
  navigation,
};
