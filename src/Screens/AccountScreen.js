import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  faEnvelope,
  faSignOutAlt,
  faList,
} from '@fortawesome/free-solid-svg-icons';

import { ListItem, ListItemSeparator } from '../Components/lists';
import colors from '../Themes/colors';
import Icon from '../Components/Icon';
import useAuth from '../Auth/useAuth';
import routes from '../Navigation/routes';

const menuItems = [
  {
    title: 'My Listings',
    icon: {
      name: faList,
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MYLIST,
  },
  {
    title: 'My Messages',
    icon: {
      name: faEnvelope,
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MYMESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  console.log(user);
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.username}
          subTitle={user.email}
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
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name={faSignOutAlt} backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
