import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';

export default function MainButton({
  title,
  textStyle = null,
  onPress,
  style = null,
  isLoading = false,
  isEnabled = true,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isEnabled}
      style={{
        height: 56,
        marginHorizontal: 16,
        backgroundColor: colors.mainButtonBg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        opacity: isEnabled ? 1 : 0.5,
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
