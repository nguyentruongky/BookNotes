import firestore from '@react-native-firebase/firestore';
import bookmarkStore from '@src/common/bookmarkStore';
import Note from '@src/models/Note';

export default async function getNotes(onSuccess: ([]) => void) {
  firestore()
    .collection('notes')
    .get()
    .then((node) => {
      const notes = node.docs.map((raw) => {
        return new Note(raw.data());
      });

      onSuccess(notes);
    });
}