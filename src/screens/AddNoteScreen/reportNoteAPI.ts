import firestore from '@react-native-firebase/firestore';
import {authUser} from '@src/common/auth';
import ID from '@src/utils/ID';

export default async function reportNote(
  noteId: string,
  reasons: string[],
  onSuccess: () => void,
) {
  const userId = authUser().currentUser?.uid ?? ID();
  const reportData = {
    createdAt: new Date().getTime(),
    reasons: reasons,
  };
  const data = {};
  data[userId] = reportData;

  firestore()
    .collection('notes')
    .doc(noteId)
    .set(
      {
        reported: data,
      },
      {merge: true},
    )
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
