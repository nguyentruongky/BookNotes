import firestore from '@react-native-firebase/firestore';

export default async function addBookmark(userId: string, noteId: string) {
  if (!userId && !noteId) {
    return;
  }

  const bookmarkData = {};
  bookmarkData[noteId] = true;
  const data = {
    bookmarks: bookmarkData,
  };
  firestore().collection('users').doc(userId).set(data, {merge: true});
}
