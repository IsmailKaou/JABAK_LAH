import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Client } from './auth/client.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  status: string;
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  ceiling: string;
  emailAddress: string;
  tokenValid: boolean;
  expirationIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  client = new BehaviorSubject<Client>(null);
  private tokenExpirationTimer: any;
  token: string;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    console.log('im in auto login');

    const clientData = JSON.parse(localStorage.getItem('clientData'));
    if (!clientData) {
      return;
    }
    const loadedClient = new Client(
      clientData.status,
      clientData.id,
      clientData.firstName,
      clientData.lastName,
      clientData.phoneNumber,
      clientData.ceiling,
      clientData.emailAddress,
      clientData.access_token,
      clientData.refresh_token,
      clientData.tokenValid,
      clientData.expirationIn
    );

    if (loadedClient.tokenValid) {
      this.client.next(loadedClient);
      this.autoLogout(loadedClient.expirationIn);
    }
  }

  autoLogout(expriationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expriationDuration);
  }

  logout() {
    const url = '/apis/api/v1/auth/logout';
    const token = JSON.parse(localStorage.getItem('clientData')).access_token;
    console.log(token);
    const body = {};

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        console.log('im logging out');

        this.client.next(null);
        this.router.navigate(['/clientLogin']);
        localStorage.removeItem('clientData');
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  authenticate(url: any, body: any, headers: any) {
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError(this.handleError),
      tap((resData) => {
        const client = new Client(
          resData.status,
          resData.id,
          resData.firstName,
          resData.lastName,
          resData.phoneNumber,
          resData.ceiling,
          resData.emailAddress,
          resData.access_token,
          resData.refresh_token,
          resData.tokenValid,
          resData.expirationIn
        );
        this.token = resData.access_token;
        // console.log(this.token);
        console.log('res Data token valid' + resData.tokenValid);
        console.log('resData' + resData);

        this.client.next(client);
        // this.autoLogout(resData.expirationIn);
        localStorage.setItem('clientData', JSON.stringify(client));
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = 'Verify your credentials and try again.';
    return throwError(errorMessage);
  }
}
