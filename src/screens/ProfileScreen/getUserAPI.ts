import firestore from '@react-native-firebase/firestore';
import User from '@src/models/User';

export default function getUser(userId: string, onSuccess: (User) => void) {
  firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((rawUser) => {
      const user = new User(rawUser.data());
      onSuccess(user);
    });
}
