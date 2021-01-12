import {v4 as uuidv4} from 'uuid';

export default class Note {
  id: string;
  content: string;
  author: string;
  book: string;
  bookmarkCount: number;

  constructor(raw: any) {
    this.id = raw.id ?? uuidv4();
    this.content = raw.content;
    this.author = raw.author;
    this.book = raw.book;
    this.bookmarkCount = raw.bookmarkCount;
  }

  static init(content: string, book: string): any {
    const note = new Note({});
    note.content = content;
    note.book = book;
  }
}
