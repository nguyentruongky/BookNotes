import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Weight, getFont} from '@fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VectorButton from '@src/components/VectorButton';
import MainButton from '@src/components/MainButton';
import addNoteAPI from './addNoteAPI';
import fetchBooksTitle from './fetchBooksTitle';
import AutocompleteView from './AutocompleteView';

export default function AddNoteScreen({navigation}) {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState('');
  const [book, setBook] = useState('');
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [originalBookDataSource, setOriginalBookDataSource] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(originalBookDataSource);
  let scrollView: ScrollView;
  useEffect(() => {
    fetchBooksTitle((titles: any[]) => {
      setOriginalBookDataSource(titles);
      setFilteredBooks(titles);
    });

    // const titles = [
    //   'Ah, love, let us be true',
    //   'To one another! for the world, which seems',
    //   'To lie before us like a land of dreams,',
    //   'So various, so beautiful, so new,',
    //   'Hath really neither joy, nor love, nor light,',
    //   'Nor certitude, nor peace, nor help for pain;',
    //   'And we are here as on a darkling plain',
    //   'Swept with confused alarms of struggle and flight,',
    //   'Where ignorant armies clash by night.',
    // ];
    // setOriginalBookDataSource(titles);
    // setFilteredBooks(titles);
  }, []);
  function filterBook(title: string) {
    const query = title.toLowerCase();
    const data = originalBookDataSource.filter((item) => {
      return item.toLowerCase().includes(query);
    });
    setFilteredBooks(data);
  }

  function onChangeBookTitle(text: string) {
    filterBook(text);
    setBook(text);
  }

  function onFocusBook() {
    setAutocompleteVisible(true);
    console.log('scrollView::', scrollView);
    scrollView?.scrollToEnd({animated: true});
  }

  function onPressSaveButton() {
    setIsSaving(true);
    addNoteAPI(content, book, () => {
      setIsSaving(false);
      navigation.pop();
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView
        style={{flex: 1, marginTop: 16, backgroundColor: 'rgb(238,238,238)'}}>
        <Header navigation={navigation} />
        <ScrollView
          ref={(sv) => {
            scrollView = sv;
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: 'gray',
              marginHorizontal: 16,
              marginBottom: 8,
              textAlign: 'center',
              paddingTop: 16,
              lineHeight: 20,
            }}>
            <MaterialIcons
              name="lightbulb-outline"
              size={24}
              style={{marginTop: 8}}
            />
            You can type with your voice by selecting the{'  '}
            <FontAwesome name="microphone" size={24} style={{marginTop: 8}} />
            {'  \n'}
            on your keyboard
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#000000AA',
              padding: 16,
              marginHorizontal: 16,
              borderRadius: 8,
              height: 160,
            }}>
            <TextInput
              style={{
                color: 'white',
                ...getFont(Weight.medium, 15),
                flex: 1,
              }}
              value={content}
              onChangeText={setContent}
              multiline={true}
              placeholder="Note content"
              placeholderTextColor="#ffffff44"
            />
          </View>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: 'gray',
              marginHorizontal: 16,
              textAlign: 'center',
              marginTop: 24,
            }}>
            Please pick one from the list
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#000000AA',
              padding: 16,
              marginHorizontal: 16,
              marginTop: 8,
              borderRadius: 8,
              height: 66,
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                color: 'white',
                ...getFont(Weight.medium, 15),
                flex: 1,
              }}
              value={book}
              onChangeText={onChangeBookTitle}
              onFocus={onFocusBook}
              multiline={true}
              placeholder="Book title"
              placeholderTextColor="#ffffff44"
            />
          </View>
          {autocompleteVisible ? (
            <AutocompleteView
              dataSource={filteredBooks}
              onSelectItem={setBook}
            />
          ) : null}

          <MainButton
            onPress={onPressSaveButton}
            title="Save"
            isLoading={isSaving}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function Header({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <VectorButton
        color="black"
        style={{height: 44, width: 44}}
        Library={AntDesign}
        name="close"
        size={32}
        onPress={() => navigation.pop()}
      />
      <View style={{flex: 1}} />
      <Text
        style={{
          ...getFont(Weight.bold, 17),
          color: 'black',
          marginRight: 44,
        }}>
        New note
      </Text>
      <View style={{flex: 1}} />
    </View>
  );
}
