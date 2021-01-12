import React, {useState} from 'react';
import {View, TextInput, Text, ScrollView, SafeAreaView} from 'react-native';
import {Weight, getFont} from '@fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VectorButton from '@src/components/VectorButton';
import MainButton from '@src/components/MainButton';

export default function AddNoteScreen({navigation}) {
  const [isSaving] = useState(false);
  function onPressSaveButton() {}
  return (
    <SafeAreaView
      style={{flex: 1, marginTop: 16, backgroundColor: 'rgb(238,238,238)'}}>
      <Header navigation={navigation} />
      <ScrollView>
        <Text
          style={{
            ...getFont(Weight.regular, 12),
            color: 'gray',
            marginHorizontal: 16,
            marginBottom: 8,
            textAlign: 'center',
            paddingTop: 16,
            lineHeight: 20,
          }}>
          <MaterialIcons
            name="lightbulb-outline"
            size={24}
            style={{marginTop: 8}}
          />
          You can type with your voice by selecting the{'  '}
          <FontAwesome name="microphone" size={24} style={{marginTop: 8}} />
          {'  \n'}
          on your keyboard
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#000000AA',
            padding: 16,
            marginHorizontal: 16,
            borderRadius: 8,
            height: 160,
          }}>
          <TextInput
            style={{
              color: 'white',
              ...getFont(Weight.medium, 15),
              flex: 1,
            }}
            multiline={true}
            placeholder="Note content"
            placeholderTextColor="white"
          />
        </View>
        <Text
          style={{
            ...getFont(Weight.regular, 12),
            color: 'gray',
            marginHorizontal: 16,
            textAlign: 'center',
            marginTop: 24,
          }}>
          Please pick one from the list
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#000000AA',
            padding: 16,
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 8,
            height: 66,
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              color: 'white',
              ...getFont(Weight.medium, 15),
              flex: 1,
            }}
            multiline={true}
            placeholder="Book title"
            placeholderTextColor="white"
          />
        </View>
        <MainButton
          onPress={onPressSaveButton}
          title="Save"
          isLoading={isSaving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <VectorButton
        color="black"
        style={{height: 44, width: 44}}
        Library={AntDesign}
        name="close"
        size={32}
        onPress={() => navigation.pop()}
      />
      <View style={{flex: 1}} />
      <Text
        style={{
          ...getFont(Weight.bold, 17),
          color: 'black',
          marginRight: 44,
        }}>
        New note
      </Text>
      <View style={{flex: 1}} />
    </View>
  );
}
