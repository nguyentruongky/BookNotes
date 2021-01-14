import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Weight, getFont} from '@fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import fetchNotes from '@src/screens/HomeScreen/fetchNotesAPI';
import searchNotes from '@src/screens/HomeScreen/searchNotesAPI';
import TextButton from '@src/components/TextButton';
import Screen from '@src/components/Screen';
import AddNoteScreen from '../AddNoteScreen/AddNoteScreen';
import VectorButton from '@src/components/VectorButton';
import ReportPopup from '@src/components/ReportPopup';
import Note from '@src/models/Note';
import {ScrollView} from 'react-native-gesture-handler';
import User from '@src/models/User';
import AsyncImage from '@src/components/AsyncImage';

export default function UserView({user}) {
  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView>
        <PersonalView user={user} />
        <View style={{height: 1, backgroundColor: '#D3D3D3', marginTop: 32}} />
        <NumberView />
        <View style={{height: 1, backgroundColor: '#D3D3D3'}} />
        <MenuView />
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
          borderColor: '#00000011',
        }}
        source={{uri: data?.image}}
        placeholderColor="#b3e5fc"
      />
      <View style={{marginHorizontal: 24}}>
        <Text
          style={{
            ...getFont(Weight.bold, 30),
            color: '#000000DD',
          }}>
          {data?.userName}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...getFont(Weight.medium, 15),
            color: 'gray',
            marginTop: 6,
          }}>
          {data?.email}
        </Text>
      </View>
    </View>
  );
}

function NumberView() {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 24,
      }}>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...getFont(Weight.bold, 28),
            color: '#000000DD',
          }}>
          188
        </Text>
        <Text
          style={{
            ...getFont(Weight.semiBold, 15),
            color: '#606060',
            marginTop: 8,
          }}>
          Notes
        </Text>
      </View>
      <View style={{width: 1, backgroundColor: '#D3D3D3'}} />

      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...getFont(Weight.bold, 28),
            color: '#000000DD',
          }}>
          188
        </Text>
        <Text
          style={{
            ...getFont(Weight.semiBold, 15),
            color: '#606060',
            marginTop: 8,
          }}>
          Notes
        </Text>
      </View>
    </View>
  );
}

function MenuView() {
  return (
    <View>
      <MenuItem
        IconLibrary={Ionicons}
        title="Your Notes"
        iconName="ios-document-text-outline"
      />
      <MenuItem
        IconLibrary={FontAwesome}
        iconName="bookmark"
        title="Your Bookmarks"
        iconLeft={4}
      />
      <View style={{marginTop: 32, height: 1, backgroundColor: '#D3D3D3'}} />

      <MenuItem
        IconLibrary={Ionicons}
        iconName="log-out-outline"
        title="Log out"
        iconLeft={4}
        color="rgb(252,47,77)"
      />
    </View>
  );
}

function MenuItem({
  IconLibrary,
  iconName,
  iconLeft = 0,
  title,
  color = '#000000DD',
}) {
  return (
    <TouchableOpacity>
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
