import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  faEnvelope,
  faSignOutAlt,
  faList,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { ListItem, ListItemSeparator } from '../Components/lists';
import colors from '../Themes/colors';
import Icon from '../Components/Icon';
import useAuth from '../Auth/useAuth';
import routes from '../Navigation/routes';
import IconCustom from '../Components/IconCustom';

const menuItems = [
  {
    title: 'Ubah Kata Sandi',
    icon: {
      name: faArrowRight,
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CHANGEPASS,
  },
  {
    title: 'Kebijakan Privasi',
    icon: {
      name: faArrowRight,
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.PRIVACYPOLICY,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  console.log(user);
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.phone_number}
          image={require('../Assets/mosh.jpg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                // <Icon
                //   name={item.icon.name}
                //   backgroundColor={item.icon.backgroundColor}
                // />
                <IconCustom
                  name="right"
                  type="ant"
                  size={17}
                  color={colors.grey}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      {/* <ListItem
        title="Log Out"
        IconComponent={<Icon name={faSignOutAlt} backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      /> */}
      <TouchableOpacity style={styles.logOut} onPress={() => logOut()}>
        <Text style={styles.textLogout}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginVertical: 20,
  },
  logOut: {
    marginTop: 320,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: 'red',
    height: 50,
    marginHorizontal: 15,
  },
  textLogout: {
    fontSize: 20,
    color: 'red',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AccountScreen;
