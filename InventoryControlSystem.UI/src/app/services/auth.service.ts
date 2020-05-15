import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import auth0 from 'auth0-js';

import { AUTH_CONFIG } from '../../configs/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // auth0Client = (from(
  //   createAuth0Client({
  //     domain: AUTH_CONFIG.YOUR_DOMAIN,
  //     client_id: AUTH_CONFIG.YOUR_CLIENT_ID,
  //     redirect_uri: AUTH_CONFIG.REDIRECT_URI
  //   })
  // ) as Observable<Auth0Client>).pipe(
  //   shareReplay(1),
  //   catchError(err => throwError(err))
  // );

  // isAuthenticated$ = this.auth0Client.pipe(
  //   concatMap((client: Auth0Client) => from(client.isAuthenticated())),
  //   tap(res => this.loggedIn = res)
  // );

  // handleRedirectCallback$ = this.auth0Client.pipe(
  //   concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  // );

  // private userProfileSubject$ = new BehaviorSubject<any>(null);
  // userProfile$ = this.userProfileSubject$.asObservable();

  // loggedIn: boolean = null;

  // constructor(private router: Router) {
  //   this.localAuthSetup();
  // }

  // getUser$(options?): Observable<any> {
  //   return this.auth0Client.pipe(
  //     concatMap((client: Auth0Client) => from(client.getUser(options))),
  //     tap(user => this.userProfileSubject$.next(user))
  //   );
  // }

  // private localAuthSetup() {
  //   const checkAuth$ = this.isAuthenticated$.pipe(
  //     concatMap((loggedIn: boolean) => {
  //       if (loggedIn) {
  //         return this.getUser$();
  //       }
  //       return of(loggedIn);
  //     })
  //   );
  //   checkAuth$.subscribe();
  // }

  // login(redirectPath: string = '/') {
  //   this.auth0Client.subscribe((client: Auth0Client) => {
  //     client.loginWithRedirect({
  //       redirect_uri: AUTH_CONFIG.REDIRECT_URI,
  //       appState: { target: redirectPath }
  //     });
  //   });
  // }

  // logout() {
  //   this.auth0Client.subscribe((client: Auth0Client) => {
  //     client.logout({
  //       client_id: AUTH_CONFIG.YOUR_CLIENT_ID,
  //       returnTo: `${window.location.origin}`
  //     });
  //   });
  // }

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.YOUR_CLIENT_ID,
    domain: AUTH_CONFIG.YOUR_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT_URI,
    scope: AUTH_CONFIG.REQUESTED_SCOPES,
    leeway: 30
  });

  public login(): void {
    var res = this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate([AUTH_CONFIG.REDIRECT_URI]);
      } else if (err) {
        let returnTo = `${window.location.origin}/login`;
        this.router.navigate([returnTo]);
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');

    // Go back to the home route
    this.auth0.logout({
      returnTo: `${window.location.origin}/login`,
      clientID: AUTH_CONFIG.YOUR_CLIENT_ID
    });
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public getUserProfile() {
    this.getProfile((err, profile) => {
      return profile;
    });
  }

  constructor(public router: Router) { }

  private getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    const scopes = authResult.scope || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }
}
