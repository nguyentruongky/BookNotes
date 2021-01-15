import bookmarkStore from '@src/common/bookmarkStore';
import ID from '@src/utils/ID';

export default class Note {
  id: string;
  content: string;
  author: string;
  book: string;
  bookmarkCount: number;
  searchTerms: string[];
  isBookmarkedByMe: boolean = false;

  constructor(raw: any) {
    this.id = raw.id ?? ID();
    this.content = (raw.content as string)?.trim();
    this.author = raw.author;
    this.book = raw.book;
    this.bookmarkCount = raw.bookmarkCount;

    this.isBookmarkedByMe = bookmarkStore.exist(this.id);
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
    note.isBookmarkedByMe = bookmarkStore.exist(note.id);
    return note;
  }
}
