import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Weight, getFont} from '@fonts';

export default function MainButton({
  title,
  textStyle = null,
  onPress,
  style = null,
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 56,
        marginHorizontal: 20,
        backgroundColor: '#000000DE',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        ...style,
      }}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          style={{position: 'absolute'}}
          color="white"
        />
      ) : (
        <Text
          style={{
            ...getFont(Weight.bold, 18),
            color: 'white',
            ...textStyle,
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
