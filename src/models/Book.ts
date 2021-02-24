export default class Book {
  id: string;
  title: string;
  updatedAt: number;
  timeString: string;
  noteCount: number = 0;
  constructor(raw: any) {
    this.id = raw['id'];
    this.title = raw['title'];
    this.updatedAt = raw['updatedAt'] ?? Date.now();
    this.timeString = new Date(this.updatedAt).toLocaleDateString();
    this.noteCount = raw['noteCount'];
  }

  static init(title: string) {
    const raw = {
      id: '',
      title,
      updatedAt: Date.now(),
    };
    const book = new Book(raw);
  }
}
