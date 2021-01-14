import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Weight, getFont} from '@fonts';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LoginView() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          ...getFont(Weight.regular, 14),
          color: 'gray',
          margin: 16,
          marginTop: 0,
          textAlign: 'center',
        }}>
        Login to use all functions
      </Text>
      <View
        style={{
          backgroundColor: '#rgb(62,90,147)',
          paddingHorizontal: 16,
          paddingVertical: 2,
          flexDirection: 'row',
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <AntDesign name="facebook-square" size={32} color="white" />
        <Text
          style={{
            ...getFont(Weight.bold, 18),
            color: 'white',
            margin: 16,
            textAlign: 'center',
          }}>
          Login with Facebook
        </Text>
      </View>
    </View>
  );
}

export function LoginPopup({visible, setVisible}) {
  return (
    <Modal
      visible={visible}
      modalAnimation={new ScaleAnimation(1)}
      onTouchOutside={() => {
        setVisible(false);
      }}>
      <ModalContent style={{margin: 16}}>
        <LoginView />
      </ModalContent>
    </Modal>
  );
}
