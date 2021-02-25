import React, {useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextButton from '@src/components/TextButton';
import VectorButton from '@src/components/VectorButton';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export function TopBar({
  title,
  keyword,
  onKeywordChange,
  cancelSearching,
  onPressFilter,
  onPressBack,
}) {
  return (
    <View
      style={{
        height: 36,
        marginHorizontal: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <VectorButton
        Library={MaterialIcons}
        name="arrow-back-ios"
        size={30}
        color={colors.mainButtonBg}
        style={{marginLeft: 16, height: 36}}
        onPress={onPressBack}
      />
      <Text
        style={{
          flex: 1,
          maxWidth: screenWidth - 66,
          marginRight: 44,
          ...getFont(Weight.bold, 20),
          color: colors.mainText,
          textAlign: 'center',
        }}>
        {title}
      </Text>
      {/* <SearchBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        cancelSearching={cancelSearching}
      /> */}
    </View>
  );
}

export function SearchBar({keyword, onKeywordChange, cancelSearching}) {
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

export function FilterMenu({
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

export function FilterButton({title, onPress}) {
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
