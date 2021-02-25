import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
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
import {appConfig} from '@src/config/appConfig';
import {useFocusEffect} from '@react-navigation/native';
import AdView from '@src/components/AdView';

const isPresentation = true;
export const HomeScreenRoute = [
  Screen(NoteListScreen),
  Screen(AddNoteScreen, isPresentation),
];
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

let timeout: NodeJS.Timeout;
export default function HomeScreen({navigation}) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginVisible, setLoginVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  let searchTerm = '';

  useFocusEffect(
    useCallback(() => {
      if (appConfig.needUpdateHome) {
        fetchBooks();
      }
      appConfig.needUpdateHome = false;
    }, []),
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  function fetchBooks() {
    getBooks((books: any[]) => {
      let dataSource = books;
      // let i = 10;
      // if (books.length < 10) {
      //   dataSource.push('ad');
      // }
      // while (i < books.length) {
      //   dataSource.push('ad');
      //   i += 10;
      // }
      setBooks(dataSource);
      console.log('datasource::', dataSource);
      setIsLoading(false);
    });
  }

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
    navigation.push('NoteListScreen', {bookId: book.id, bookTitle: book.title});
  }

  function renderItem(data: any) {
    if (data === 'ad') {
      return <AdView />;
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
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={(item) => renderItem(item.item)}
          keyExtractor={(item) => item.id}
        />
      )}

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
          position: 'absolute',
          top: screenHeight - 200,
          left: screenWidth - 82,
        }}
      />

      <LoginPopup
        visible={loginVisible}
        setVisible={setLoginVisible}
        loginCallback={loginCallback}
      />
    </SafeAreaView>
  );
}
