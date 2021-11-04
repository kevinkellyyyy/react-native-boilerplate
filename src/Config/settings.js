const settings = {
  dev: {
    apiUrl: 'https://linistore-dev.macroad.co.id/api/v1.0/',
  },
  prod: {
    apiUrl: 'https://asuransikita-dev.macroad.co.id////',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) {
    return settings.dev;
  }
  return settings.prod;
};

export default getCurrentSettings();
