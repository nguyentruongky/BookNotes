import User from '@src/models/User';
import auth from '@react-native-firebase/auth';
import getUser from '@src/screens/ProfileScreen/getUserAPI';
import checkBookmarkExist from './checkBookmarkExistAPI';
import addBookmark from './addBookmarkAPI';
import removeBookmark from './removeBookmarkAPI';
import {add} from 'react-native-reanimated';

class BookmarkStore {
  currentUser: User;
  userId = auth().currentUser?.uid;
  constructor() {
    console.log('Create bookmarkstore');
  }
  getCurrentUser() {
    getUser(this.userId, (user) => {
      this.currentUser = user;
    });
  }

  exist(noteId: string) {
    console.log('bookmarkStore::exist');
    if (this.currentUser == null) {
      this.getCurrentUser();
      console.log('bookmarkStore::exist::false');
      return false;
    } else {
      const doesExist = this.currentUser.bookmarks.includes(noteId);
      console.log('bookmarkStore::exist', doesExist);
      return doesExist;
    }
  }

  addBookmark(noteId: string) {
    addBookmark(this.userId, noteId);
    this.currentUser.bookmarks.push(noteId);
  }

  deleteBookmark(noteId: string) {
    removeBookmark(this.userId, noteId);
    const bookmarkArray = [];
    for (let index = 0; index < this.currentUser.bookmarks.length; index++) {
      const element = this.currentUser.bookmarks[index];
      if (element != noteId) {
        bookmarkArray.push(element);
      }
    }
    this.currentUser.bookmarks = bookmarkArray;
  }

  toggleBookmark(noteId: string) {
    if (this.exist(noteId)) {
      this.deleteBookmark(noteId);
    } else {
      this.addBookmark(noteId);
    }
  }
}

const bookmarkStore = new BookmarkStore();
bookmarkStore.getCurrentUser();

export default bookmarkStore;
