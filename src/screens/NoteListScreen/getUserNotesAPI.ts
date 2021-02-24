import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';

export default function getUserNotes(userId: string, onSuccess: ([]) => void) {
  if (!userId) {
    onSuccess([]);
    return;
  }
  firestore()
    .collection('notes')
    .where('author', '==', userId)
    .get()
    .then((querySnapshot) => {
      const notes = querySnapshot.docs.map((raw) => {
        return new Note(raw.data());
      });

      onSuccess(notes);
    });
}
