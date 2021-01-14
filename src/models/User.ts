export default class User {
  userName: string;
  userId: string;
  email: string;
  image: string;

  constructor(raw: any) {
    this.userName = raw.userName;
    this.userId = raw.userId;
    this.email = raw.email;
    this.image = raw.image;
  }
}
