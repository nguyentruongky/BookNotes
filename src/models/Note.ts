import {authUser} from '@src/common/auth';
import bookmarkStore from '@src/common/bookmarkStore';
import ID from '@src/utils/ID';
import Book from './Book';

export default class Note {
  id: string;
  content: string;
  author: string;
  book: string;
  bookId: string;
  bookmarkCount: number;
  searchTerms: string[];
  isBookmarkedByMe: boolean = false;
  isReportedByMe: boolean = false;
  shouldHidden: boolean = false;
  createdAt: number = 0;

  constructor(raw: any) {
    this.id = raw.id ?? ID();
    this.content = (raw.content as string)?.trim();
    this.author = raw.author;
    this.book = raw.book;
    this.bookmarkCount = raw.bookmarkCount;

    this.isBookmarkedByMe = bookmarkStore.exist(this.id);

    const userId = authUser().currentUser?.uid ?? '';
    const reportedBy = Object.keys(raw.reported ?? {});
    this.isReportedByMe = reportedBy.includes(userId);
    this.shouldHidden = (raw.reportedCount ?? 0) > 5;
    this.createdAt = Date.now();
  }

  static init(content: string, book: Book) {
    const note = new Note({});
    note.content = content;
    note.book = book.title;
    note.bookId = book.id;

    const words = content.split(' ');
    console.log('Book::', book);
    const bookWords = book.title.split(' ');
    bookWords.forEach((word) => {
      words.push(word);
    });
    note.searchTerms = words;
    return note;
  }
}
