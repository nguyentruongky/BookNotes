import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions, TextInput, FlatList, Keyboard} from 'react-native';
import {Weight, getFont} from '@fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NoteCell from './NoteCell';
import {SafeAreaView} from 'react-native-safe-area-context';
import fetchNotes from '@src/screens/HomeScreen/fetchNotesAPI';
import searchNotes from '@src/screens/HomeScreen/searchNotesAPI';
import TextButton from '@src/components/TextButton';
import Screen from '@src/components/Screen';
import AddNoteScreen from '../AddNoteScreen/AddNoteScreen';
import VectorButton from '@src/components/VectorButton';
import ReportPopup from '@src/components/ReportPopup';
import Note from '@src/models/Note';
import {LoginPopup} from '../ProfileScreen/LoginView';
import auth from '@react-native-firebase/auth';

const isPresentation = true;
export const HomeScreenRoute = [Screen(AddNoteScreen, isPresentation)];

let timeout: NodeJS.Timeout;
export default function HomeScreen({navigation}) {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  useEffect(() => {
    // useNotes((notes: any[]) => setNotes(notes));
  }, []);

  const [keyword, setKeyword] = useState('');
  let searchTerm = '';
  function onKeywordChange(keyword: string) {
    setKeyword(keyword);
    searchTerm = keyword;
    clearTimeout(timeout);
    initTimeout();
  }
  function initTimeout() {
    timeout = setTimeout(function () {
      searchNotes(searchTerm, (notes: []) => {
        setNotes(notes);
      });
    }, 500);
  }
  function cancelSearching() {
    setKeyword('');
    fetchNotes((notes: any[]) => setNotes(notes));
  }

  async function onPressAddButton() {
    const userId = auth().currentUser?.uid;
    if (userId) {
      navigation.push('AddNoteScreen');
    } else {
      setLoginVisible(!loginVisible);
    }
  }

  function loginCallback(id: string) {
    if (id) {
      setLoginVisible(!loginVisible);
      navigation.push('AddNoteScreen');
    }
  }

  function onPressFilter() {
    setLoginVisible(!loginVisible);
  }

  function onReport(note: Note) {
    setSelectedNote(note);
    setReportVisible(true);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(238,238,238)'}}>
      <TopBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
        onPressFilter={onPressFilter}
      />
      <FlatList
        data={notes}
        renderItem={(item) => (
          <NoteCell data={item.item} onReport={() => onReport(item.item)} />
        )}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{
          position: 'absolute',
          top: screenHeight - 180,
          left: screenWidth - 82,
        }}>
        <VectorButton
          Library={Ionicons}
          color="white"
          size={36}
          name="add"
          onPress={onPressAddButton}
          style={{
            backgroundColor: '#000000AA',
            height: 66,
            width: 66,
            borderRadius: 33,
          }}
        />
      </View>

      <ReportPopup
        note={selectedNote}
        visible={reportVisible}
        setVisible={setReportVisible}
      />

      <LoginPopup
        visible={loginVisible}
        setVisible={setLoginVisible}
        loginCallback={loginCallback}
      />
    </SafeAreaView>
  );
}

function TopBar({keyword, onKeywordChange, cancelSearching, onPressFilter}) {
  return (
    <View
      style={{
        height: 36,
        marginHorizontal: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <SearchBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
      />

      <VectorButton
        Library={Foundation}
        name="filter"
        size={30}
        color="#000000AA"
        style={{marginLeft: 16, height: 36}}
        onPress={onPressFilter}
      />
    </View>
  );
}
function SearchBar({keyword, onKeywordChange, cancelSearching}) {
  const [searchEnabled, setSearchEnabled] = useState(false);
  function onPressCancel() {
    setSearchEnabled(false);
    Keyboard.dismiss();
    cancelSearching();
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#000000AA',
          paddingHorizontal: 16,
          borderRadius: 22,
        }}>
        <EvilIcons name="search" size={24} color="white" />
        <TextInput
          style={{
            marginLeft: 8,
            color: 'white',
            ...getFont(Weight.semiBold, 15),
            flex: 1,
            height: 40,
          }}
          value={keyword}
          onChangeText={onKeywordChange}
          onFocus={() => setSearchEnabled(true)}
          placeholder="Search by book title or content"
          placeholderTextColor="white"
        />
      </View>
      {searchEnabled ? (
        <TextButton
          onPress={onPressCancel}
          title="Cancel"
          textStyle={{color: 'black'}}
          style={{marginLeft: 16}}
        />
      ) : null}
    </View>
  );
}
