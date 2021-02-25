import firestore from '@react-native-firebase/firestore';
import bookmarkStore from './bookmarkStore';

export default async function removeBookmark(userId: string, noteId: string) {
  if (!userId && !noteId) {
    return;
  }

  var docRef = firestore().collection('users').doc(userId);
  const userRaw = (await docRef.get()).data();
  const bookmarks = userRaw['bookmarks'];
  delete bookmarks[noteId];
  docRef.update({
    bookmarks,
  });
}
