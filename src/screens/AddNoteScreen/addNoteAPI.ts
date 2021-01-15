import firestore from '@react-native-firebase/firestore';
import Note from '@src/models/Note';

export default async function addNoteAPI(
  content: string,
  book: string,
  onSuccess: (note: Note) => void,
) {
  const note: Note = Note.init(content, book);
  firestore()
    .collection('notes')
    .doc(note.id)
    .set(note)
    .then(() => onSuccess(note));

  const bookWords = book.toLocaleLowerCase().split(' ');
  let bookTitle = bookWords.join('');
  bookTitle = bookTitle.charAt(0).toUpperCase() + bookTitle.slice(1);
  firestore().collection('books').doc(bookTitle).set({
    title: book,
    searchTerms: bookWords,
  });
}
