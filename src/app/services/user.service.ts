import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';

import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(public afs:AngularFirestore) { 
    this.usersCollection = this.afs.collection('users');
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  loginUser(userLogin:User){
    return this.usersCollection.ref.where("email", "==", userLogin.email);
  }

  getUsers() {
    return this.users; 
  }

  addUser(user: User) {
    this.usersCollection.add(user);
  }

  deleteTask(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }

}
