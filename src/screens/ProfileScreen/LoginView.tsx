import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Weight, getFont} from '@fonts';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import saveUser from './saveUserAPI';

export default function LoginView({loginCallback = null}) {
  async function onPressFacebookButton() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      return;
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    auth()
      .signInWithCredential(facebookCredential)
      .then((loginResult) => {
        const uid = loginResult.user.uid;
        if (loginCallback) {
          loginCallback(uid);
        }

        const user = loginResult.user;
        console.log('user::', user);
        saveUser(user.displayName, uid, user.email, user.photoURL);
      })
      .catch((error) => {
        console.log('Reject error::', error);
      });
  }

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
      <TouchableOpacity onPress={onPressFacebookButton}>
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
      </TouchableOpacity>
    </View>
  );
}

export function LoginPopup({visible, setVisible, loginCallback}) {
  return (
    <Modal
      visible={visible}
      modalAnimation={new ScaleAnimation(1)}
      onTouchOutside={() => {
        setVisible(false);
      }}>
      <ModalContent style={{margin: 16}}>
        <LoginView loginCallback={loginCallback} />
      </ModalContent>
    </Modal>
  );
}
