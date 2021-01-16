import React, {useState} from 'react';
import {View, Text, Dimensions, TextInput, Keyboard} from 'react-native';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import {Weight, getFont, colors} from '@src/assets/theme';
import TextButton from './TextButton';
import MainButton from './MainButton';
import {ScrollView} from 'react-native-gesture-handler';
import reportNote from '@src/screens/AddNoteScreen/reportNoteAPI';

const reasons = {};
export default function ReportPopup({note, visible, setVisible}) {
  const {width: screenWidth} = Dimensions.get('screen');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [reasonInputValue, setReasonInputValue] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [sending, setSending] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  let reasonTextInput: TextInput;
  function onPressSomethingElse() {
    setKeyboardVisible(!keyboardVisible);
    if (keyboardVisible) {
      reasonTextInput?.blur();
      delete reasons['other'];
    } else {
      reasonTextInput?.focus();
    }
    setCanSubmit(Object.keys(reasons).length > 0);
  }
  function onPressReason(reason: string) {
    setKeyboardVisible(false);
    reasonTextInput?.blur();
    if (reasons[reason]) {
      delete reasons[reason];
    } else {
      reasons[reason] = true;
    }
    setCanSubmit(Object.keys(reasons).length > 0);
  }
  function onPressSubmitButton() {
    Keyboard.dismiss();
    setKeyboardVisible(false);
    setSending(true);
    const otherReason = reasons['other'];
    if (otherReason) {
      delete reasons['other'];
    }
    const reasonsArray = Object.keys(reasons);
    if (otherReason) {
      reasonsArray.push(reasonInputValue);
    }

    reportNote(note.id, reasonsArray, () => {
      setSending(false);
      setMessageVisible(true);
      setTimeout(() => {
        setVisible(false);
        setCanSubmit(false);
        setMessageVisible(false);
        setReasonInputValue('');
      }, 2000);
    });
  }
  return (
    <Modal
      visible={visible}
      modalAnimation={new ScaleAnimation(1)}
      onTouchOutside={() => {
        setVisible(false);
        setKeyboardVisible(false);
        setCanSubmit(false);
      }}>
      <ModalContent style={{backgroundColor: colors.popupBg}}>
        <View
          style={{
            margin: -20,
            width: screenWidth - 48,
          }}>
          {messageVisible ? (
            <Text
              style={{
                ...getFont(Weight.semiBold, 15),
                color: colors.mainText,
                margin: 16,
                textAlign: 'center',
              }}>
              Thanks for letting us know! We're on it now.
            </Text>
          ) : (
            <ScrollView
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="always">
              <Text
                style={{
                  ...getFont(Weight.semiBold, 14),
                  color: colors.mainText,
                  margin: 16,
                  textAlign: 'center',
                }}>
                What do you want to report?
              </Text>

              <View style={{height: 1, backgroundColor: colors.line}} />

              <View
                style={{
                  margin: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TagView title="Spam" onPress={() => onPressReason('spam')} />
                  <TagView
                    title="Violence"
                    onPress={() => onPressReason('violence')}
                  />
                </View>
                <TagView
                  title="Posting Inappropriate Things"
                  onPress={() => onPressReason('inappropriate')}
                />
                <TagView
                  title="Something Else"
                  onPress={onPressSomethingElse}
                />
              </View>
              <TextInput
                ref={(input) => {
                  reasonTextInput = input;
                }}
                style={{
                  color: colors.mainText,
                  ...getFont(Weight.medium, 15),
                  height: keyboardVisible ? 100 : 0,
                  marginHorizontal: 16,
                  marginBottom: keyboardVisible ? 16 : 0,
                  paddingHorizontal: 16,
                  paddingTop: keyboardVisible ? 16 : 0,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.line,
                  opacity: keyboardVisible ? 1 : 0,
                }}
                value={reasonInputValue}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    reasons['other'] = true;
                  } else {
                    delete reasons['other'];
                  }
                  setCanSubmit(Object.keys(reasons).length > 0);
                  setReasonInputValue(text);
                }}
                multiline={true}
                placeholder="Tell us the problem"
                placeholderTextColor={colors.subText}
                selectionColor={colors.subText}
              />

              <MainButton
                style={{marginTop: 0}}
                isEnabled={canSubmit}
                onPress={onPressSubmitButton}
                title="Send"
                isLoading={sending}
              />

              {keyboardVisible ? <View style={{height: 200}} /> : null}
            </ScrollView>
          )}
        </View>
      </ModalContent>
    </Modal>
  );
}

function TagView({title, onPress}) {
  const [selected, setSelected] = useState(false);
  function onPressButton() {
    setSelected(!selected);
    onPress();
  }
  return (
    <TextButton
      title={title}
      textStyle={{color: selected ? colors.mainText : colors.subText}}
      onPress={onPressButton}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginLeft: 8,
        marginBottom: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: selected ? colors.bg : colors.inputBg,
        backgroundColor: selected ? colors.bg : colors.inputBg,
      }}
    />
  );
}
