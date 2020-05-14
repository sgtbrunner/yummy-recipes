import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../shared/constants/app-constants';
import { AuthResponseData } from './auth-response-data';
import { catchError } from 'rxjs/operators';
import { ErrorConstants } from '../shared/constants/error-constants';
import { throwError } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http
    .post<AuthResponseData>(
      AppConstants.SIGNUP_URL + AppConstants.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
    .pipe(catchError(errorRes => this.handleError(errorRes)))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;
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
        default:
          errorMessage = ErrorConstants.CLIENT_ERROR_DEFAULT_MESSAGE;
      }
    } else {
      errorMessage = ErrorConstants.CLIENT_ERROR_DEFAULT_MESSAGE;
    }
    return throwError(errorMessage);
  }
}