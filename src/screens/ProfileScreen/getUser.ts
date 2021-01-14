import firestore from '@react-native-firebase/firestore';
import User from '@src/models/User';

export default async function getUser(
  userId: string,
  onSuccess: (User) => void,
) {
  const rawUser = await firestore().collection('users').doc(userId).get();
  const user = new User(rawUser.data());
  onSuccess(user);
}
