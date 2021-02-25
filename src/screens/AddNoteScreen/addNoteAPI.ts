import firestore from '@react-native-firebase/firestore';
import Book from '@src/models/Book';
import Note from '@src/models/Note';

export default async function addNoteAPI(
  content: string,
  book: Book,
  onSuccess: (note: Note) => void,
) {
  const note: Note = Note.init(content, book);
  firestore()
    .collection('notes')
    .doc(note.id)
    .set(note)
    .then(() => onSuccess(note));

  book.noteCount += 1;
  firestore().collection('books').doc(book.id).set(book, {merge: true});
}
