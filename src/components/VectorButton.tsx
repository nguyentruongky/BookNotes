import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default function VectorButton({
  Library,
  size,
  name,
  color,
  onPress = null,
  style = null,
}) {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onPress={onPress}>
      <Library name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
