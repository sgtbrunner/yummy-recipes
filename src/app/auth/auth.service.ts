import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../shared/constants/app-constants';
import { AuthResponseData } from './auth-response-data';
import { catchError } from 'rxjs/operators';
import { ErrorConstants } from '../shared/constants/error-constants';
import { throwError, Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
    .post<AuthResponseData>(
      AppConstants.SIGNUP_URL + 'AIzaSyC9I_QnxNa_DMYegh3Mrci4GGvFSmenZLE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
    .post<AuthResponseData>(
      AppConstants.SIGNIN_URL + 'AIzaSyC9I_QnxNa_DMYegh3Mrci4GGvFSmenZLE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(catchError(this.handleError));
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
          errorMessage = ErrorConstants.CLIENT_EMAIL_PASSWORD_DONT_MATCH;
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