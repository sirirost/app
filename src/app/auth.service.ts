import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;

}

@Injectable()
export class AuthService {

  user: Observable<User>
  public State: Observable<firebase.User>
  public currentUser: firebase.User = null;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }

      })

    // this.State = this.afAuth.authState;
    // this.State.subscribe(user => {
    //  if (user) {
    //      console.log('User', user.email)
    //     this.currentUser = user;
    //   } else {
    //    this.currentUser = null;
    //  }
    // });
  };


  // signupemail(email: string, password: string) {
  //   this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Success!', value);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  // loginemail(email: string, password: string) {
  //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Nice, it worked!');
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    this.State = this.afAuth.authState;
    this.State.subscribe(user => {
      if (user) {
        console.log('UID : ', user.uid)
        console.log('Email : ', user.email)
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    return this.oAuthLogin(provider)

  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,

    }
    return userRef.set(data)
  }

  loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    this.State = this.afAuth.authState;
    this.State.subscribe(user => {
      if (user) {
        console.log('UID : ', user.uid)
        console.log('Email : ', user.email)
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    return this.oAuthLogin(provider)
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }




}
