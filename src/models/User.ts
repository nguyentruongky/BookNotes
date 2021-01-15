export default class User {
  userName: string;
  userId: string;
  email: string;
  image: string;
  bookmarks: string[] = [];
  notes: string[] = [];

  constructor(raw: any) {
    this.userName = raw?.userName;
    this.userId = raw?.userId;
    this.email = raw?.email;
    this.image = raw?.image;

    if ('posts' in raw) {
      this.notes = Object.keys(raw.posts);
    }
    if ('bookmarks' in raw) {
      this.bookmarks = Object.keys(raw.bookmarks);
    }
  }
}
