import firestore from '@react-native-firebase/firestore';

export default async function getBooksTitle(onSuccess: ([]) => void) {
  firestore()
    .collection('books')
    .get()
    .then((node) => {
      const notes = node.docs.map((raw) => {
        return raw.data().title;
      });

      onSuccess(notes);
    });
}
