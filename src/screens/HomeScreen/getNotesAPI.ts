import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';
import NoteFilter from '@src/utils/NoteFilter';

export default async function getNotes(onSuccess: ([]) => void) {
  const node = await firestore().collection('notes').get();
  let notes = node.docs.map((raw) => {
    return new Note(raw.data());
  });
  notes = NoteFilter(notes);
  onSuccess(notes);
}
