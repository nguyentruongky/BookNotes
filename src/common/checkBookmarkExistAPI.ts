import firestore from '@react-native-firebase/firestore';
import User from '@src/models/User';
import getUser from '../screens/ProfileScreen/getUserAPI';

export default async function checkBookmarkExist(
  userId: string,
  noteId: string,
) {
  if (!userId && !noteId) {
    return false;
  }
  return new Promise((resolve, reject) => {
    getUser(userId, (user: User) => {
      const exist = user.bookmarks.includes(userId);
      resolve(exist);
    });
  });
}
