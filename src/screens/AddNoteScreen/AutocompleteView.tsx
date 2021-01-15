import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Weight, getFont} from '@fonts';

export default function AutocompleteView({dataSource, onSelectItem}) {
  return (
    <FlatList
      style={{
        margin: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000AA',
        maxHeight: 160,
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{height: 16}} />}
      data={dataSource}
      renderItem={(item) => (
        <AutocompleteCell item={item} onPress={onSelectItem} />
      )}
      keyExtractor={(item) => item}
    />
  );
}

function AutocompleteCell({item, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress(item.item)}>
      <Text
        style={{
          ...getFont(Weight.medium, 14),
          color: 'gray',
          marginTop: 16,
          textTransform: 'capitalize',
        }}>
        {item.item}
      </Text>
    </TouchableOpacity>
  );
}
