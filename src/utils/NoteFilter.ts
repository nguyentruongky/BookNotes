import Note from '@src/models/Note';

export default function NoteFilter(notes: Note[]) {
  const newNotes = [];
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (!element.shouldHidden || !element.isReportedByMe) {
      newNotes.push(element);
    }
  }

  return newNotes;
}
