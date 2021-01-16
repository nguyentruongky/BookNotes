import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';

export default function TextButton({
  title,
  textStyle = null,
  onPress,
  style = null,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text
        style={{
          ...getFont(Weight.medium, 15),
          color: '#4B5167',
          ...textStyle,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
