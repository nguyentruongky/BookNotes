import React from 'react';
import {View, Dimensions, TextInput} from 'react-native';
import {Weight, getFont} from '@fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Button, Icon} from 'react-native-elements';
import QuoteCell from './QuoteCell';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(258,86,63)'}}>
      <TopBar />
      <QuoteCell />
      <QuoteCell />
      <QuoteCell />
      <QuoteCell />

      <View
        style={{
          position: 'absolute',
          top: screenHeight - 180,
          left: screenWidth - 82,
        }}>
        <Button
          type="clear"
          icon={<Ionicons name="add" color="white" size={36} />}
          titleStyle={{color: 'black', ...getFont(Weight.medium, 16)}}
          style={{
            backgroundColor: 'green',
            height: 66,
            width: 66,
            borderRadius: 33,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function TopBar() {
  return (
    <View
      style={{
        height: 36,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <SearchBar />
      <Icon
        name="filter"
        type="foundation"
        style={{marginLeft: 16}}
        onPress={() => console.log('Filter pressed')}
      />
    </View>
  );
}
function SearchBar() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000AA',
        paddingLeft: 16,
        borderRadius: 22,
      }}>
      <EvilIcons name="search" size={24} color="white" />
      <TextInput
        style={{
          marginLeft: 8,
          color: 'white',
          ...getFont(Weight.semiBold, 15),
          flex: 1,
          height: 40,
        }}
        placeholder="Search by book title or content"
        placeholderTextColor="white"
      />
    </View>
  );
}
