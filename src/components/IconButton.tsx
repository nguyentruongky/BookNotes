import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default function IconButton({
  icon,
  tintColor = null,
  height = 44,
  width = 44,
  iconRatio = '50%',
  onPress = null,
  style = null,
}) {
  const tint = tintColor != null ? {tintColor} : null;
  return (
    <TouchableOpacity
      style={{
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{width: iconRatio, height: iconRatio, ...tint}}
      />
    </TouchableOpacity>
  );
}
