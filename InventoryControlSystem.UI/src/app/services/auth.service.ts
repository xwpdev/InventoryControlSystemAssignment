import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AUTH_CONFIG } from '../../configs/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client = (from(
    createAuth0Client({
      domain: AUTH_CONFIG.YOUR_DOMAIN,
      client_id: AUTH_CONFIG.YOUR_CLIENT_ID,
      redirect_uri: AUTH_CONFIG.REDIRECT_URI
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );

  isAuthenticated$ = this.auth0Client.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );

  handleRedirectCallback$ = this.auth0Client.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor(private router: Router) {
    this.localAuthSetup();
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    this.auth0Client.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: AUTH_CONFIG.REDIRECT_URI,
        appState: { target: redirectPath }
      });
    });
  }

  logout() {
    this.auth0Client.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: AUTH_CONFIG.YOUR_CLIENT_ID,
        returnTo: `${window.location.origin}`
      });
    });
  }

}
