import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  DocumentReference,
  Timestamp,
  serverTimestamp
} from '@angular/fire/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Timestamp;
  verified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly db = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly user$ = new Observable<User | null>((subscriber) =>
    this.auth.onAuthStateChanged(subscriber)
  );

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  registerUser(email: string, password: string, firstName: string, lastName:string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(credential =>
        from(sendEmailVerification(credential.user)).pipe(
          map(() => credential)
        )
      ),
      switchMap(credential =>
        this.createUserProfile(credential.user.uid, email, firstName,lastName).pipe(
          map(() => credential)
        )
      ),
      tap(() => {
        this.router.navigate(['/verify-email']);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  googleLogin(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(credential => {
        if (!credential.user) {
          return throwError(() => new Error('No user data'));
        }

        const displayName = credential.user.displayName || '';
        const [firstName = '', lastName = ''] = displayName.split(' ');

        return this.createUserProfile(
          credential.user.uid,
          credential.user.email || '',
          firstName,
          lastName
        );
      }),
      tap(() => this.router.navigate(['/dashboard'])),
      catchError(error => {
        console.error('Google login error:', error);
        return throwError(() => error);
      })
    );
  }

  private createUserProfile(
    userId: string,
    email: string,
    firstName?: string,
    lastName?: string
  ): Observable<void> {
    const userDoc = doc(this.db, 'users', userId) as DocumentReference<UserProfile>;
    const userData: UserProfile = {
      uid: userId,
      email,
      firstName,
      lastName,
      createdAt: serverTimestamp() as Timestamp,
      verified: false
    };

    return from(setDoc(userDoc, userData));
  }

  resendVerificationEmail(): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) {
      return throwError(() => new Error('No user logged in'));
    }
    return from(sendEmailVerification(user));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError(error => {
        console.error('Password reset error:', error);
        return throwError(() => error);
      })
    );
  }

  updateUserVerificationStatus(userId: string): Observable<void> {
    const userDoc = doc(this.db, 'users', userId) as DocumentReference<UserProfile>;
    return from(setDoc(userDoc, { verified: true }, { merge: true }));
  }

  logout(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      tap(() => this.router.navigate(['/login'])),
      catchError(error => {
        console.error('Logout error:', error);
        return throwError(() => error);
      })
    );
  }
}
