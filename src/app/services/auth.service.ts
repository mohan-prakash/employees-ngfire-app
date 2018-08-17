import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;
  userDisplayName: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private readonly notifier: NotifierService,
    private router: Router
  ) {
    this.user = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userDisplayName = user.displayName;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  socialLoginWithGoogle(): Observable<any> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.firebaseAuth.auth
      .signInWithPopup(provider));
  }

  signInWithEmail(email: string, password: string): Observable<any> {
    return from(this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password));
  }

  isLoggedIn() {
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.notifier.notify('success', 'Successfully signed out!');
      this.router.navigate(['/']);
    });
  }

  private handleError(error: Error) {
    console.error(error);
    this.notifier.notify('error', error.message);
  }
}
