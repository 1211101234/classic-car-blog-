import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) => {
        // Simulated login check
        if (username === 'admin' && password === 'admin123') {
          return of(loginSuccess({ user: { username, role: 'admin' } }));
        } else if (username === 'user' && password === 'user123') {
          return of(loginSuccess({ user: { username, role: 'user' } }));
        } else {
          return of(loginFailure({ error: 'Invalid username or password' }));
        }
      })
    )
  );
}
