import firestore from '@react-native-firebase/firestore';
import Book from '@src/models/Book';
import ID from '@src/utils/ID';
export default async function getBooksAPI(onSuccess: ([]) => void) {
  firestore()
    .collection('books')
    .orderBy('updatedAt', 'desc')
    .get()
    .then((node) => {
      const books = node.docs.map((raw) => {
        return new Book(raw.data());
      });

      onSuccess(books);
    });
}
