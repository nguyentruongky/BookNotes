import React, {useRef, useState} from 'react';
import {View, Text, SafeAreaView, Vibration} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import Note from '@src/models/Note';
import VectorButton from '@src/components/VectorButton';
import bookmarkStore from '@src/common/bookmarkStore';
import {authUser} from '@src/common/auth';
import {appConfig} from '@src/config/appConfig';

export default function NoteCell({data, showLogin, onReport}) {
  const note = data as Note;
  if (note === undefined) {
    return <View />;
  }

  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarkedByMe);

  const refRBSheet = useRef();

  function onLongPress() {
    Vibration.vibrate();
    refRBSheet.current.open();
  }

  function onPressBookmark() {
    const userId = authUser().currentUser?.uid;
    if (userId) {
      const noteId = note.id;
      bookmarkStore.toggleBookmark(noteId);
      setIsBookmarked(!isBookmarked);
      appConfig.needUpdateProfile = true;
    } else {
      showLogin();
    }
  }

  return (
    <SafeAreaView style={{flexDirection: 'row'}}>
      <View
        style={{
          flex: 1,
          margin: 16,
          marginBottom: 0,
          padding: 16,
          borderRadius: 10,
          backgroundColor: colors.bubble,
        }}>
        <TouchableWithoutFeedback
          delayLongPress={500}
          delayPressIn={0}
          onLongPress={onLongPress}>
          <Text style={{...getFont(Weight.bold, 15), color: colors.mainText}}>
            {note?.content}
          </Text>
          <Text
            style={{
              ...getFont(Weight.regular, 12),
              color: colors.subText,
              textAlign: 'right',
              marginTop: 16,
            }}>
            {note?.book}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {isBookmarked ? (
        <VectorButton
          Library={FontAwesome}
          name="bookmark"
          size={30}
          color={colors.mainButtonBg}
          style={{marginRight: 16, marginTop: 16}}
          onPress={onPressBookmark}
        />
      ) : (
        <VectorButton
          Library={FontAwesome}
          name="bookmark-o"
          size={30}
          color={colors.mainButtonBg}
          style={{marginRight: 16, marginTop: 16}}
          onPress={onPressBookmark}
        />
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={160}
        customStyles={{
          container: {
            backgroundColor: colors.popupBg,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
        }}>
        <BottomSheet
          onReport={() => {
            onReport();
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
    </SafeAreaView>
  );
}

function BottomSheet({onReport}) {
  return (
    <View>
      <Button
        title="Report"
        icon={
          <Octicons
            name="report"
            color={colors.subText}
            size={20}
            style={{marginRight: 16}}
          />
        }
        onPress={onReport}
      />

      {/* <Button
        title="Share"
        icon={
          <EvilIcons name="share-apple" size={28} style={{marginRight: 8}} />
        }
        onPress={() => console.log('Share pressed')}
      /> */}
    </View>
  );
}

function Button({title, icon, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 16,
          marginTop: 16,
          alignItems: 'center',
        }}>
        {icon}
        <Text style={{color: colors.subText, ...getFont(Weight.medium, 16)}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
