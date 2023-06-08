import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface VerificationResponseData {
  msg: string;
}
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}
  resetPassword(newPassword: string, token: string, url: string) {
    const body = {
      newPassword: newPassword,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http
      .post<VerificationResponseData>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = 'An Error Occured!';
    return throwError(errorMessage);
  }
}
