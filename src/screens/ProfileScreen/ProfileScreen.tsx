import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Weight, getFont} from '@fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoginView from './LoginView';

export default function ProfileScreen() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <LoginView />
      </View>
      {/* <UserView /> */}
      <AppInfo />
    </View>
  );
}

function AppInfo() {
  return (
    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          ...getFont(Weight.regular, 14),
          color: '#606060',
          margin: 16,
        }}>
        Version 0.1 {'  '}
        <Entypo name="info-with-circle" size={16} color="#606060" />
      </Text>
    </TouchableOpacity>
  );
}
