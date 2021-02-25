import React from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Note from '@src/models/Note';
import Book from '@src/models/Book';

const screenWidth = Dimensions.get('screen').width;

export default function BookCell({data, onPressCell}) {
  const book = data as Book;
  if (book === undefined) {
    return <View />;
  }

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
        marginBottom: 0,
        padding: 16,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.bubble,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={onPressCell}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...getFont(Weight.bold, 17),
                maxWidth: screenWidth * 0.6,
                color: colors.mainText,
              }}>
              {book?.title}
            </Text>

            <Text
              style={{
                ...getFont(Weight.regular, 12),
                color: colors.subText,
                textAlign: 'right',
              }}>
              {book?.timeString}
            </Text>
          </View>

          <Text style={{...getFont(Weight.medium, 13), color: colors.subText}}>
            {book?.noteCount} notes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
