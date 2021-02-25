import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {colors} from '@src/assets/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoteCell from './NoteCell';
import {SafeAreaView} from 'react-native-safe-area-context';
import getNotes from '@src/screens/NoteListScreen/getNotesAPI';
import searchNotes from '@src/screens/NoteListScreen/searchNotesAPI';
import VectorButton from '@src/components/VectorButton';
import ReportPopup from '@src/components/ReportPopup';
import Note from '@src/models/Note';
import {LoginPopup} from '../ProfileScreen/LoginView';
import {TopBar} from './NoteListComponents';
import {authUser} from '@src/common/auth';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

enum LoginPurpose {
  ADD_NOTE,
  BOOKMARK,
}

let timeout: NodeJS.Timeout;
let loginFinishAction: any;

export default function NoteListScreen({navigation, route}) {
  const {bookId, bookTitle} = route.params;
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportVisible, setReportVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // not used for now
  const [keyword, setKeyword] = useState('');
  let searchTerm = '';

  useEffect(() => {
    getNotes(bookId, (notes: any[]) => {
      setIsLoading(false);
      setNotes(notes);
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
        setNotes(notes);
      });
    }, 500);
  }
  function cancelSearching() {
    setKeyword('');
    getNotes(bookId, (notes: any[]) => setNotes(notes));
  }

  async function onPressAddButton() {
    const userId = authUser().currentUser?.uid;
    if (userId) {
      navigation.push('AddNoteScreen');
    } else {
      loginFinishAction = () => navigation.push('AddNoteScreen');
      setLoginVisible(!loginVisible);
    }
  }

  function loginCallback(id: string) {
    if (id) {
      setLoginVisible(!loginVisible);
      console.log('loginFinishAction', loginFinishAction);
      if (loginFinishAction) {
        loginFinishAction();
      }
    }
  }

  function onReport(note: Note) {
    setSelectedNote(note);
    setReportVisible(true);
  }

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator style={{}} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
      <StatusBar barStyle="light-content" />
      <TopBar
        title={bookTitle}
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
        onPressFilter={null}
        onPressBack={() => navigation.pop()}
      />
      <FlatList
        data={notes}
        renderItem={(item) => (
          <NoteCell
            data={item.item}
            showLogin={() => setLoginVisible(true)}
            onReport={() => onReport(item.item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{
          position: 'absolute',
          top: screenHeight - 140,
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
