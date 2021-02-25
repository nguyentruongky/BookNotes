import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  AppRegistry,
  Platform,
} from 'react-native';
import {Weight, getFont, colors} from '@src/assets/theme';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import saveUser from './saveUserAPI';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

const screenWidth = Dimensions.get('screen').width;
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
        saveUser(user.displayName, uid, user.email, user.photoURL);
      })
      .catch((error) => {
        console.log('Reject error::', error);
      });
  }

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const credential = auth.AppleAuthProvider.credential(
        appleAuthRequestResponse.identityToken,
        appleAuthRequestResponse.nonce,
      );

      auth()
        .signInWithCredential(credential)
        .then((loginResult) => {
          const uid = loginResult.user.uid;
          if (loginCallback) {
            loginCallback(uid);
          }

          const user = loginResult.user;
          console.log('user', user);
          saveUser(user.displayName ?? user.email, uid, user.email, null);
        })
        .catch((error) => {
          console.log('Reject error::', error);
        });
    }
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          ...getFont(Weight.regular, 14),
          color: colors.subText,
          margin: 16,
          marginTop: 0,
          textAlign: 'center',
        }}>
        Login to use all functions
      </Text>

      <View style={{}}>
        <TouchableOpacity onPress={onPressFacebookButton}>
          <View
            style={{
              backgroundColor: '#rgb(62,90,147)',
              paddingHorizontal: 16,
              paddingVertical: 2,
              flexDirection: 'row',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="facebook-square" size={32} color="white" />
            <Text
              style={{
                ...getFont(Weight.bold, 18),
                color: 'white',
                margin: 16,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Login with Facebook
            </Text>
          </View>
        </TouchableOpacity>

        {Platform.OS == 'ios' ? (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              marginTop: 16,
              width: screenWidth - 108,
              height: 54,
            }}
            onPress={onAppleButtonPress}
          />
        ) : null}
      </View>
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
      <ModalContent style={{backgroundColor: colors.popupBg}}>
        <LoginView loginCallback={loginCallback} />
      </ModalContent>
    </Modal>
  );
}
