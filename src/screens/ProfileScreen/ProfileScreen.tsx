import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StatusBar} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import LoginView from './LoginView';
import UserView from './UserView';
import getUser from './getUserAPI';
import {authUser} from '@src/common/auth';
import {useFocusEffect} from '@react-navigation/native';
import {appConfig} from '@src/config/appConfig';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      getUser(user.uid, (myAccount) => {
        setUser(myAccount);
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (appConfig.needUpdateProfile) {
        const userId = user?.uid ?? authUser().currentUser?.uid;
        getUser(userId, (myAccount) => {
          setUser(myAccount);
        });
      }
      appConfig.needUpdateProfile = false;
    }, []),
  );

  useEffect(() => {
    const subscriber = authUser().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <StatusBar barStyle="light-content" />
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
