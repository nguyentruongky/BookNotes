import firestore from '@react-native-firebase/firestore';
import ID from '@src/utils/ID';

export default async function reportNote(
  noteId: string,
  reasons: string[],
  onSuccess: () => void,
) {
  let userId = ID();
  const data = {
    createdTime: new Date().getTime(),
    reasons: reasons,
  };

  if (!userId) {
    userId = ID();
  }
  firestore()
    .collection('notes')
    .doc(noteId)
    .collection('reported')
    .doc(userId)
    .set(data)
    .then(() => {
      onSuccess();
    });

  firestore()
    .collection('notes')
    .doc(noteId)
    .get()
    .then((node) => {
      let reportedCount = 0;
      const data = node.data();
      console.log('data::', data);
      if (data !== undefined) {
        reportedCount = (data['reportedCount'] as number) ?? 0;
      }
      reportedCount += 1;
      firestore().collection('notes').doc(noteId).set(
        {
          reportedCount,
        },
        {
          merge: true,
        },
      );
    });
}
