import React, {useEffect, useState} from 'react';
import {View, Dimensions, TextInput, FlatList, Keyboard} from 'react-native';
import {Weight, getFont} from '@fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import NoteCell from './NoteCell';
import {SafeAreaView} from 'react-native-safe-area-context';
import useNotes from '@src/hooks/useNotes';
import useSearch from '@src/hooks/useSearch';
import TextButton from '@src/components/TextButton';
import Screen from '@src/components/Screen';
import AddNoteScreen from '../AddNoteScreen/AddNoteScreen';
import VectorButton from '@src/components/VectorButton';

const isPresentation = true;
export const HomeScreenRoute = [Screen(AddNoteScreen, isPresentation)];

let timeout: NodeJS.Timeout;
export default function HomeScreen({navigation}) {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const [notes, setNotes] = useState([]);
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
      useSearch(searchTerm, (notes: []) => {
        setNotes(notes);
      });
    }, 500);
  }

  function cancelSearching() {
    setKeyword('');
    useNotes((notes: any[]) => setNotes(notes));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(238,238,238)'}}>
      <TopBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
      />
      <FlatList
        data={notes}
        renderItem={(item) => <NoteCell data={item.item} />}
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
          onPress={() => navigation.push('AddNoteScreen')}
          style={{
            backgroundColor: '#000000AA',
            height: 66,
            width: 66,
            borderRadius: 33,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function TopBar({keyword, onKeywordChange, cancelSearching}) {
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
        onPress={() => console.log('Filter pressed')}
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
          textStyle={{color: 'white'}}
          style={{marginLeft: 16}}
        />
      ) : null}
    </View>
  );
}
