import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';
import NoteFilter from '@src/utils/NoteFilter';

export default function searchNotes(keyword: string, onSuccess: ([]) => void) {
  firestore()
    .collection('notes')
    .where('searchTerms', 'array-contains-any', [keyword.toLowerCase()])
    .get()
    .then((querySnapshot) => {
      let notes = querySnapshot.docs.map((raw) => {
        return new Note(raw.data());
      });
      notes = NoteFilter(notes);
      onSuccess(notes);
    });
}
