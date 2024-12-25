import { Injectable, inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { from, tap, catchError, Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';

export const logoutGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return from(signOut(auth)).pipe(
    map(() => {
      router.navigate(['/login']);
      return false;
    }),
    catchError((error) => {
      console.error('Logout error:', error);
      return of(false);
    })
  );
};
