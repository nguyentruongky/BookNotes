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
import {Weight, getFont, colors} from '@src/assets/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VectorButton from '@src/components/VectorButton';
import MainButton from '@src/components/MainButton';
import addNoteAPI from './addNoteAPI';
import getBooks from './getBooksAPI';
import AutocompleteView from './AutocompleteView';
import Book from '@src/models/Book';
import {appConfig} from '@src/config/appConfig';

export default function AddNoteScreen({navigation}) {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [selectedBook, setSelectedBook] = useState(new Book({}));
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [originalBookDataSource, setOriginalBookDataSource] = useState(
    new Array<Book>(),
  );
  const [filteredBooks, setFilteredBooks] = useState(originalBookDataSource);
  let scrollView: ScrollView;
  useEffect(() => {
    getBooks((books: Book[]) => {
      setOriginalBookDataSource(books);
      setFilteredBooks(books);
    });
  }, []);
  function filterBook(title: string) {
    const query = title.toLowerCase();
    let data = originalBookDataSource.filter((item) => {
      return item.title.toLowerCase().includes(query);
    });
    if (data.length == 0) {
      const newBook = Book.init(title);
      data.push(newBook);
    }
    setFilteredBooks(data);
  }

  function onChangeBookTitle(text: string) {
    filterBook(text);
    setBookTitle(text);
  }

  function onFocusBook() {
    setAutocompleteVisible(true);
    scrollView?.scrollToEnd({animated: true});
  }

  function onSelectBook(selectedBook: Book) {
    setSelectedBook(selectedBook);
    setAutocompleteVisible(false);
    setBookTitle(selectedBook.title);
  }

  function onPressSaveButton() {
    setIsSaving(true);
    addNoteAPI(content, selectedBook, () => {
      setIsSaving(false);
      appConfig.needUpdateHome = true;
      navigation.pop();
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bg}}>
        <Header navigation={navigation} />
        <ScrollView
          ref={(sv) => {
            scrollView = sv;
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: colors.subText,
              marginHorizontal: 16,
              marginBottom: 12,
              marginTop: 24,
              textAlign: 'center',
              paddingTop: 16,
              lineHeight: 20,
            }}>
            <MaterialIcons name="lightbulb-outline" size={24} />
            You can type with your voice by selecting the{'  '}
            <FontAwesome name="microphone" size={24} />
            {'  \n'}
            on your keyboard
          </Text>
          <View
            style={{
              backgroundColor: colors.inputBg,
              padding: 16,
              marginHorizontal: 16,
              borderRadius: 10,
              height: 160,
            }}>
            <TextInput
              style={{
                flex: 1,
                color: colors.mainText,
                ...getFont(Weight.medium, 15),
              }}
              autoCapitalize="sentences"
              autoCorrect={true}
              value={content}
              onChangeText={setContent}
              multiline={true}
              placeholder="Note content"
              placeholderTextColor={colors.subText}
              selectionColor={colors.subText}
            />
          </View>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: colors.subText,
              marginHorizontal: 16,
              textAlign: 'center',
              marginTop: 24,
            }}>
            Please pick one from the list
          </Text>
          <View
            style={{
              backgroundColor: colors.inputBg,
              marginHorizontal: 16,
              marginTop: 8,
              borderRadius: 8,
            }}>
            <TextInput
              style={{
                paddingTop: 16,
                paddingBottom: 16,
                marginHorizontal: 16,
                color: colors.mainText,
                ...getFont(Weight.medium, 15),
              }}
              value={bookTitle}
              autoCapitalize="words"
              autoCorrect={true}
              onChangeText={onChangeBookTitle}
              onFocus={onFocusBook}
              multiline={true}
              placeholder="Book title"
              placeholderTextColor={colors.subText}
              selectionColor={colors.subText}
            />
          </View>
          {autocompleteVisible ? (
            <AutocompleteView
              dataSource={filteredBooks}
              onSelectItem={(selectedBook: Book) => onSelectBook(selectedBook)}
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
        color={colors.subText}
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
          color: colors.mainText,
          marginRight: 44,
        }}>
        New note
      </Text>
      <View style={{flex: 1}} />
    </View>
  );
}
