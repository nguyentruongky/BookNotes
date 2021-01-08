import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();
const tabOptions = {
  showLabel: false,
  style: {
    height: '10%',
    backgroundColor: 'white',
  },
};

export default function Tabs() {
  function getIcon(screenName, focused) {
    const tintColor = focused ? 'rgb(238,86,63)' : 'rgb(85,85,85)';
    const tabIcons = {
      HomeScreen: <Entypo name="home" size={30} color={tintColor} />,
      SearchScreen: <AntDesign name="search1" size={30} color={tintColor} />,
      MyTicketScreen: (
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={30}
          color={tintColor}
        />
      ),
      FavoriteScreen: <AntDesign name="hearto" size={30} color={tintColor} />,
      ProfileScreen: <FontAwesome name="user-o" size={30} color={tintColor} />,
    };

    return tabIcons[screenName];
  }
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return getIcon(route.name, focused);
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Search Screen</Text>
    </View>
  );
}

function MyTicketScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>My Ticket Screen</Text>
    </View>
  );
}

function FavoriteScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Favorite Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Profile Screen</Text>
    </View>
  );
}
