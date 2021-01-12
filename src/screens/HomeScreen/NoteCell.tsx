import React, {useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Weight, getFont} from '@fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from 'react-native-elements';
import Note from '@src/models/Note';

export default function NoteCell({data}) {
  const note = data as Note;
  if (note === undefined) {
    return <View />;
  }
  const refRBSheet = useRef();

  function onLongPress() {
    refRBSheet.current.open();
  }
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          margin: 16,
          marginBottom: 0,
          padding: 16,
          borderRadius: 16,
          backgroundColor: '#000000AA',
        }}>
        <TouchableWithoutFeedback
          delayLongPress={0}
          delayPressIn={0}
          onLongPress={onLongPress}>
          <Text style={{...getFont(Weight.bold, 15), color: 'white'}}>
            {note?.content}
          </Text>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: '#ffffffAA',
              textAlign: 'right',
              marginTop: 8,
            }}>
            {note?.book}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <FontAwesome
        name="bookmark"
        size={30}
        color="#900"
        style={{marginRight: 16, marginTop: 16}}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={160}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <BottomSheet />
      </RBSheet>
    </SafeAreaView>
  );
}

function BottomSheet() {
  return (
    <View>
      <Button
        title="Report"
        type="clear"
        icon={<Octicons name="report" size={16} style={{marginRight: 16}} />}
        titleStyle={{color: 'black', ...getFont(Weight.medium, 16)}}
        style={{marginLeft: 16, width: 120}}
        buttonStyle={{
          borderRadius: 6,
          justifyContent: 'flex-start',
        }}
      />

      <Button
        title="Share"
        type="clear"
        icon={
          <EvilIcons name="share-apple" size={24} style={{marginRight: 10}} />
        }
        titleStyle={{color: 'black', ...getFont(Weight.medium, 16)}}
        style={{marginLeft: 14, width: 120}}
        buttonStyle={{borderRadius: 6, justifyContent: 'flex-start'}}
      />
    </View>
  );
}
