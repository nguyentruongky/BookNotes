import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';
import NoteFilter from '@src/utils/NoteFilter';

export default async function getNotes(
  bookId: string,
  onSuccess: ([]) => void,
) {
  const node = await firestore()
    .collection('notes')
    .where('bookId', '==', bookId)
    .orderBy('id', 'desc')
    .get();

  let notes = node.docs.map((raw) => {
    return new Note(raw.data());
  });
  notes = NoteFilter(notes);
  onSuccess(notes);
}
