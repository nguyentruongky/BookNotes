import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TextInput,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Weight, getFont} from '@fonts';
import colors from '@colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NoteCell from './NoteCell';
import {SafeAreaView} from 'react-native-safe-area-context';
import getNotes from '@src/screens/HomeScreen/getNotesAPI';
import searchNotes from '@src/screens/HomeScreen/searchNotesAPI';
import TextButton from '@src/components/TextButton';
import Screen from '@src/components/Screen';
import AddNoteScreen from '../AddNoteScreen/AddNoteScreen';
import VectorButton from '@src/components/VectorButton';
import ReportPopup from '@src/components/ReportPopup';
import Note from '@src/models/Note';
import {LoginPopup} from '../ProfileScreen/LoginView';
import auth from '@react-native-firebase/auth';
import getUserNotes from './getUserNotesAPI';
import getMyBookmarks from '../../common/getMyBookmarksAPI';

const isPresentation = true;
export const HomeScreenRoute = [Screen(AddNoteScreen, isPresentation)];
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

enum FilterType {
  MY_BOOKMARKS,
  MY_NOTES,
  ALL_NOTES,
}

let timeout: NodeJS.Timeout;
let filterType = FilterType.ALL_NOTES;
export default function HomeScreen({navigation}) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  useEffect(() => {
    getNotes((notes: any[]) => setNotes(notes));
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
    getNotes((notes: any[]) => setNotes(notes));
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

  function onReport(note: Note) {
    setSelectedNote(note);
    setReportVisible(true);
  }

  function onPressMyNotes() {
    setFilterVisible(false);

    if (filterType == FilterType.MY_NOTES) {
      return;
    }
    filterType = FilterType.MY_NOTES;
    const userId = auth().currentUser?.uid;
    getUserNotes(userId, (notes: Note[]) => {
      setNotes(notes);
    });
  }

  function onPressMyBookmarks() {
    setFilterVisible(false);

    if (filterType == FilterType.MY_BOOKMARKS) {
      return;
    }
    filterType = FilterType.MY_BOOKMARKS;
    const userId = auth().currentUser?.uid;
    getMyBookmarks(userId, (notes: Note[]) => {
      setNotes(notes);
    });
  }

  function onPressLatestNotes() {
    setFilterVisible(false);

    if (filterType == FilterType.ALL_NOTES) {
      return;
    }
    filterType = FilterType.ALL_NOTES;
    getNotes((notes: any[]) => setNotes(notes));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
      <TopBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
        onPressFilter={() => setFilterVisible(true)}
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
            backgroundColor: colors.mainButtonBg,
            height: 66,
            width: 66,
            borderRadius: 33,
          }}
        />
      </View>

      {filterVisible ? (
        <FilterMenu
          setFilterVisible={setFilterVisible}
          onPressMyBookmarks={onPressMyBookmarks}
          onPressMyNotes={onPressMyNotes}
          onPressLatestNotes={onPressLatestNotes}
        />
      ) : null}

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
        color={colors.mainButtonBg}
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
          backgroundColor: colors.inputBg,
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
          textStyle={{color: colors.subText}}
          style={{marginLeft: 16}}
        />
      ) : null}
    </View>
  );
}

function FilterMenu({
  setFilterVisible,
  onPressMyNotes,
  onPressMyBookmarks,
  onPressLatestNotes,
}) {
  return (
    <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
      <View
        style={{
          position: 'absolute',
          width: screenWidth,
          height: screenHeight,
          flex: 1,
          backgroundColor: '#19191bDD',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}} />
        <View style={{marginTop: 110, marginRight: 20}}>
          <View
            style={{
              backgroundColor: colors.popupBg,
              borderRadius: 10,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}>
            <FilterButton title="My notes" onPress={onPressMyNotes} />
            <FilterButton title="My bookmarks" onPress={onPressMyBookmarks} />
            <FilterButton title="Latest notes" onPress={onPressLatestNotes} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function FilterButton({title, onPress}) {
  return (
    <TextButton
      title={title}
      textStyle={{
        ...getFont(Weight.medium, 15),
        color: colors.subText,
        marginTop: 24,
      }}
      onPress={onPress}
    />
  );
}
