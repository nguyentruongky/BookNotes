import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import ProfileScreen from '@src/screens/ProfileScreen/ProfileScreen';

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
    const tintColor = focused ? '#000000DD' : '#B8B8B8';
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
