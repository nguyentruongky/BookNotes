import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Book from '@src/models/Book';

export default function AutocompleteView({dataSource, onSelectItem}) {
  return (
    <FlatList
      style={{
        margin: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.inputBg,
        maxHeight: 160,
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{height: 16}} />}
      data={dataSource}
      renderItem={(item) => (
        <AutocompleteCell
          key={item.item.id}
          item={item.item}
          onPress={() => onSelectItem(item.item)}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
}

function AutocompleteCell({item, onPress}) {
  const book = item as Book;
  return (
    <TouchableOpacity onPress={() => onPress(book)}>
      <Text
        style={{
          ...getFont(Weight.medium, 14),
          color: colors.subText,
          marginTop: 16,
          textTransform: 'capitalize',
        }}>
        {book.title}
      </Text>
    </TouchableOpacity>
  );
}
