import firestore from '@react-native-firebase/firestore';

export default async function saveUser(
  userName: string,
  userId: string,
  email: string,
  image: string,
) {
  const data = {
    userName,
    userId,
    email,
    image: image + '?type=large',
  };
  firestore().collection('users').doc(userId).set(data);
}
