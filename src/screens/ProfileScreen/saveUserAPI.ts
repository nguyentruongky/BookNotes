import firestore from '@react-native-firebase/firestore';

export default async function saveUser(
  userName: string,
  userId: string,
  email: string,
  image: string,
) {
  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/booknotes-45f0c.appspot.com/o/appAssets%2Fanonymous.png?alt=media&token=cb8c9701-5236-4da7-b810-859b24886729';
  const data = {
    userName,
    userId,
    email,
    image: image === null ? defaultAvatar : image + '?type=large',
  };
  firestore().collection('users').doc(userId).set(data, {merge: true});
}
