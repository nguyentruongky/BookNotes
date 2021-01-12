import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Screen(screen, isPresentation = false) {
  let animation =
    Platform.OS == 'android'
      ? TransitionPresets.FadeFromBottomAndroid
      : TransitionPresets.ModalSlideFromBottomIOS;

  if (isPresentation == false) {
    animation = TransitionPresets.DefaultTransition;
  }
  return (
    <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen}
      options={{
        ...animation,
      }}
    />
  );
}
