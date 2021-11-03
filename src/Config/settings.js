const settings = {
  dev: {
    apiUrl: 'https://asuransikita-dev.macroad.co.id',
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
