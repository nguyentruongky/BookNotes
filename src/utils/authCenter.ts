import AsyncStorage from '@react-native-community/async-storage';

let userId;
export default function authCenter() {
  const tokenKey = 'userId';
  async function saveUserId(id: string) {
    userId = id;
    await AsyncStorage.setItem(tokenKey, JSON.stringify({id}));
  }

  async function checkIdExist(): Promise<boolean> {
    const token = await AsyncStorage.getItem(tokenKey);
    userId = token;
    return token !== null;
  }

  async function getUserId(): Promise<string> {
    const session = await AsyncStorage.getItem(tokenKey);
    if (session === null) {
      return null;
    }
    const {id} = JSON.parse(session);
    userId = id;
    console.log('userId::', userId);
    return id;
  }

  async function removeUserId() {
    AsyncStorage.removeItem(tokenKey);
  }

  return {userId, saveUserId, checkIdExist, getUserId, removeUserId};
}
