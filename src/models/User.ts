export default class User {
  userName: string;
  userId: string;
  email: string;
  image: string;
  bookmarks: string[] = [];
  notes: string[] = [];

  constructor(raw: any) {
    if (raw === undefined || raw === null) {
      return;
    }
    this.userName = raw?.userName;
    this.userId = raw?.userId;
    this.email = raw?.email;
    this.image = raw?.image;

    console.log('UserRaw::', raw);
    if ('posts' in raw) {
      this.notes = Object.keys(raw.posts);
    }
    if ('bookmarks' in raw) {
      this.bookmarks = Object.keys(raw.bookmarks);
    }
  }
}
