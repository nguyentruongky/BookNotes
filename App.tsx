import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from '@src/navigation/Tabs';
import {HomeScreenRoute} from '@src/screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabScreen" component={Tabs} />

        {HomeScreenRoute}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
