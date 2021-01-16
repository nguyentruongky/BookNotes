import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import LoginView from './LoginView';
import auth from '@react-native-firebase/auth';
import UserView from './UserView';
import getUser from './getUserAPI';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      getUser(user.uid, (myAccount) => {
        setUser(myAccount);
      });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      {user ? (
        <UserView user={user} />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LoginView />
        </View>
      )}
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
          color: colors.subText,
          margin: 16,
        }}>
        Version 0.1 {'  '}
        <Entypo name="info-with-circle" size={16} color={colors.subText} />
      </Text>
    </TouchableOpacity>
  );
}
