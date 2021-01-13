import ID from '@src/utils/ID';

export default class Note {
  id: string;
  content: string;
  author: string;
  book: string;
  bookmarkCount: number;
  searchTerms: string[];

  constructor(raw: any) {
    this.id = raw.id ?? ID();
    this.content = (raw.content as string)?.trim();
    this.author = raw.author;
    this.book = raw.book;
    this.bookmarkCount = raw.bookmarkCount;
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
