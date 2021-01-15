import bookmarkStore from '@src/common/bookmarkStore';
import auth from '@react-native-firebase/auth';
import ID from '@src/utils/ID';

export default class Note {
  id: string;
  content: string;
  author: string;
  book: string;
  bookmarkCount: number;
  searchTerms: string[];
  isBookmarkedByMe: boolean = false;
  isReportedByMe: boolean = false;
  shouldHidden: boolean = false;

  constructor(raw: any) {
    this.id = raw.id ?? ID();
    this.content = (raw.content as string)?.trim();
    this.author = raw.author;
    this.book = raw.book;
    this.bookmarkCount = raw.bookmarkCount;

    this.isBookmarkedByMe = bookmarkStore.exist(this.id);

    const userId = auth().currentUser?.uid ?? '';
    const reportedBy = Object.keys(raw.reported ?? {});
    this.isReportedByMe = reportedBy.includes(userId);
    this.shouldHidden = (raw.reportedCount ?? 0) > 5;
  }

  static init(content: string, book: string) {
    const note = new Note({});
    note.content = content;
    note.book = book;

    const words = content.split(' ');
    const bookWords = book.split(' ');
    bookWords.forEach((word) => {
      words.push(word);
    });
    note.searchTerms = words;
    return note;
  }
}
