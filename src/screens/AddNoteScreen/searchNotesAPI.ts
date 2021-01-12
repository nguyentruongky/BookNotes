import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';

export default async function searchNotes(
  keyword: string,
  onSuccess: ([]) => void,
) {
  firestore()
    .collection('notes')
    .where('searchTerms', 'array-contains-any', [keyword.toLowerCase()])
    .get()
    .then((querySnapshot) => {
      const notes = querySnapshot.docs.map((raw) => {
        return new Note(raw.data());
      });

      onSuccess(notes);
    });
}
