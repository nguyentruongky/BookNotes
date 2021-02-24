import React, {useEffect, useState} from 'react';
import {View, Dimensions, FlatList, StatusBar} from 'react-native';
import {colors} from '@src/assets/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import searchNotes from '@src/screens/NoteListScreen/searchNotesAPI';
import Screen from '@src/components/Screen';
import AddNoteScreen from '../AddNoteScreen/AddNoteScreen';
import VectorButton from '@src/components/VectorButton';
import {LoginPopup} from '../ProfileScreen/LoginView';
import auth from '@react-native-firebase/auth';
import {TopBar} from './HomeComponents';
import BookCell from './BookCell';
import getBooks from '../AddNoteScreen/getBooksAPI';
import ID from '@src/utils/ID';
import NoteListScreen from '../NoteListScreen/NoteListScreen';
import Book from '@src/models/Book';

const isPresentation = true;
export const HomeScreenRoute = [
  Screen(NoteListScreen),
  Screen(AddNoteScreen, isPresentation),
];
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

let timeout: NodeJS.Timeout;
export default function HomeScreen({navigation}) {
  const [books, setBooks] = useState([]);
  const [loginVisible, setLoginVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  let searchTerm = '';

  useEffect(() => {
    getBooks((books: any[]) => {
      let dataSource = books;
      let i = 10;
      if (books.length < 10) {
        dataSource.push('ad');
      }
      while (i < books.length) {
        dataSource.push('ad');
        i += 10;
      }
      setBooks(dataSource);
    });
  }, []);

  function onKeywordChange(keyword: string) {
    setKeyword(keyword);
    searchTerm = keyword;
    clearTimeout(timeout);
    initTimeout();
  }
  function initTimeout() {
    timeout = setTimeout(function () {
      searchNotes(searchTerm, (notes: []) => {
        setBooks(notes);
      });
    }, 500);
  }
  function cancelSearching() {
    setKeyword('');
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

  function onPressCell(data: any) {
    if (data === 'ad') {
      return;
    }

    const book = data as Book;
    navigation.push('NoteListScreen', {bookId: book.id});
  }

  function renderItem(data: any) {
    if (data === 'ad') {
      return (
        <View
          key={ID()}
          style={{
            height: 40,
            backgroundColor: 'green',
            marginTop: 16,
            marginHorizontal: 16,
          }}
        />
      );
    }
    return (
      <BookCell
        key={data.id}
        data={data}
        onPressCell={() => onPressCell(data)}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
      <StatusBar barStyle="light-content" />
      <TopBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
        onPressFilter={null}
      />
      <FlatList
        data={books}
        renderItem={(item) => renderItem(item.item)}
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

      <LoginPopup
        visible={loginVisible}
        setVisible={setLoginVisible}
        loginCallback={loginCallback}
      />
    </SafeAreaView>
  );
}
