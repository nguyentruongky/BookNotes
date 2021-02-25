import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import User from '@src/models/User';
import AsyncImage from '@src/components/AsyncImage';
import {authUser} from '@src/common/auth';

export default function UserView({user}) {
  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView>
        <PersonalView user={user} />
        <View
          style={{height: 1, backgroundColor: colors.line, marginTop: 32}}
        />
        <NumberView user={user} />
        <View style={{height: 1, backgroundColor: colors.line}} />
        {/* <MenuView /> */}
      </SafeAreaView>
    </ScrollView>
  );
}

function PersonalView({user}) {
  const data = user as User;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 40,
        marginTop: 40,
        alignItems: 'center',
      }}>
      <AsyncImage
        style={{
          height: 88,
          width: 88,
          borderRadius: 44,
          borderWidth: 2,
          borderColor: colors.inputBg,
        }}
        source={{uri: data?.image}}
        placeholderColor={colors.inputBg}
      />
      <View style={{marginHorizontal: 24, flex: 1}}>
        <Text
          numberOfLines={1}
          style={{
            ...getFont(Weight.bold, 30),
            color: colors.mainText,
          }}>
          {data?.userName}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...getFont(Weight.medium, 15),
            color: colors.subText,
            marginTop: 6,
          }}>
          {data?.email}
        </Text>
      </View>
    </View>
  );
}

function NumberView({user}) {
  const data = user as User;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 24,
      }}>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...getFont(Weight.bold, 32),
            color: colors.mainText,
          }}>
          {data?.notes?.length}
        </Text>
        <Text
          style={{
            ...getFont(Weight.semiBold, 15),
            color: colors.subText,
            marginTop: 8,
          }}>
          Notes
        </Text>
      </View>
      <View style={{width: 1, backgroundColor: colors.line}} />

      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...getFont(Weight.bold, 32),
            color: colors.mainText,
          }}>
          {data?.bookmarks?.length}
        </Text>
        <Text
          style={{
            ...getFont(Weight.semiBold, 15),
            color: colors.subText,
            marginTop: 8,
          }}>
          Bookmarks
        </Text>
      </View>
    </View>
  );
}

function MenuView() {
  function onPressLogout() {
    authUser().signOut();
  }
  return (
    <View>
      <MenuItem
        onPress={null}
        IconLibrary={Ionicons}
        title="Your Notes"
        iconName="ios-document-text-outline"
      />
      <MenuItem
        onPress={null}
        IconLibrary={FontAwesome}
        iconName="bookmark"
        title="Your Bookmarks"
        iconLeft={4}
      />
      <View style={{marginTop: 32, height: 1, backgroundColor: colors.line}} />

      <MenuItem
        IconLibrary={Ionicons}
        iconName="log-out-outline"
        title="Log out"
        iconLeft={4}
        color={colors.danger}
        onPress={onPressLogout}
      />
    </View>
  );
}

function MenuItem({
  IconLibrary,
  iconName,
  iconLeft = 0,
  title,
  color = colors.subText,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 32,
          marginLeft: 32,
        }}>
        <IconLibrary
          name={iconName}
          size={32}
          color={color}
          style={{marginRight: 24 - iconLeft, width: 32, marginLeft: iconLeft}}
        />
        <Text
          style={{
            ...getFont(Weight.semiBold, 18),
            color: color,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
