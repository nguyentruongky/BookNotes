import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Weight, getFont} from '@fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(258,86,63)', paddingTop: 16}}>
      <QuoteCell />
      <QuoteCell />
      <QuoteCell />
      <QuoteCell />
    </View>
  );
}

function QuoteCell() {
  const iconSize = 24;
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 16,
          padding: 16,
          borderRadius: 16,
          backgroundColor: '#000000AA',
        }}>
        <Text style={{...getFont(Weight.bold, 15), color: 'white'}}>
          You’ve gotta dance like there’s nobody watching,Love like you’ll never
          be hurt,Sing like there’s nobody listening,And live like it’s heaven
          on earth.
        </Text>
        <Text
          style={{
            ...getFont(Weight.regular, 12),
            color: '#ffffffAA',
            textAlign: 'right',
            marginTop: 8,
          }}>
          Don't make me cry
        </Text>
      </View>
      <FontAwesome
        name="bookmark"
        size={30}
        color="#900"
        style={{marginRight: 16, marginTop: 16}}
      />
    </SafeAreaView>
  );
}
