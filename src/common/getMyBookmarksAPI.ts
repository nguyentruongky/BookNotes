import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';
import User from '@src/models/User';
import NoteFilter from '@src/utils/NoteFilter';

export default async function getMyBookmarks(
  userId: string,
  onSuccess: ([]) => void,
) {
  if (!userId) {
    onSuccess([]);
    return;
  }

  const rawUser = await firestore().collection('users').doc(userId).get();
  const user = new User(rawUser.data());
  if (user.bookmarks.length == 0) {
    onSuccess([]);
    return;
  }

  firestore()
    .collection('notes')
    .where('id', 'in', user.bookmarks)
    .get()
    .then((querySnapshot) => {
      let notes = querySnapshot.docs.map((raw) => {
        return new Note(raw.data());
      });
      notes = NoteFilter(notes);
      onSuccess(notes);
    });
}
