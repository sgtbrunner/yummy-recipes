import { User } from './user.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from './auth-response-data';
import { AppConstants } from '../shared/constants/app-constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorConstants } from '../shared/constants/error-constants';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable( { providedIn: 'root' } )
export class AuthService {
  constructor(private readonly http: HttpClient,
              private readonly router: Router) { }

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
    .post<AuthResponseData>(
      AppConstants.SIGNUP_URL + environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(
      tap(resData => this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)),
      catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
    .post<AuthResponseData>(
      AppConstants.SIGNIN_URL + environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(
      tap(resData => this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)),
      catchError(this.handleError));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email, 
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const remainingDuration =  
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  userIsLoggedIn(): boolean {
    return localStorage.getItem('userData') ? true : false ;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, userId, token, expirationDate );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn*1000);
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    console.log(errorRes);
    if(errorRes.error || errorRes.error.error) {
      switch(errorRes.error.error.message) {
        case ErrorConstants.SERVER_ERROR_EMAIL_EXISTS:
          errorMessage = ErrorConstants.CLIENT_ERROR_EMAIL_EXISTS;
          break;
        case ErrorConstants.SERVER_ERROR_OPERATION_NOT_ALLOWED:
          errorMessage = ErrorConstants.CLIENT_ERROR_OPERATION_NOT_ALLOWED;
          break;
        case ErrorConstants.SERVER_ERROR_TOO_MANY_ATTEMPTS:
          errorMessage = ErrorConstants.CLIENT_ERROR_TOO_MANY_ATTEMPTS;
          break;
        case ErrorConstants.SERVER_EMAIL_NOT_FOUND || ErrorConstants.SERVER_INVALID_PASSWORD:
          errorMessage = ErrorConstants.USERNAME_ANDOR_PASSWORD_IS_INVALID;
          break;
        case ErrorConstants.SERVER_USER_DISABLED:
          errorMessage = ErrorConstants.CLIENT_USER_DISABLED;
          break;
        default:
          errorMessage = ErrorConstants.CLIENT_ERROR_DEFAULT_MESSAGE;
      }
    } else {
      errorMessage = ErrorConstants.CLIENT_ERROR_DEFAULT_MESSAGE;
    }
    return throwError(errorMessage);
  }
}