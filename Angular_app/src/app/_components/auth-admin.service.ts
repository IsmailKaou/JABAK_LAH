import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Admin } from './auth/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  admin = new BehaviorSubject<Admin>(null);
  private tokenExpirationTimer: any;
  token: string;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    console.log('im in auto login');

    const adminData = JSON.parse(localStorage.getItem('adminData'));
    console.log('this is admin data' + adminData);

    if (!adminData) {
      return;
    }
    const loadedAdmin = new Admin(
      adminData.id,
      adminData.firstName,
      adminData.lastName,
      adminData.email,
      adminData.access_token,
      adminData.refresh_token,
      adminData.tokenValid,
      adminData.expirationIn
    );

    if (loadedAdmin.tokenValid) {
      this.admin.next(loadedAdmin);
      this.autoLogout(loadedAdmin.expirationIn);
    }
  }

  autoLogout(expriationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expriationDuration);
  }

  logout() {
    const url = '/apis/api/v1/auth/logout';
    const token = JSON.parse(localStorage.getItem('adminData')).access_token;
    console.log(token);
    const body = {};

    this.admin.next(null);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        console.log('im logging out');

        this.admin.next(null);
        this.router.navigate(['/adminLogin']);
        localStorage.removeItem('adminData');
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
        const admin = new Admin(
          resData.id,
          resData.firstName,
          resData.lastName,
          resData.email,
          resData.access_token,
          resData.refresh_token,
          resData.tokenValid,
          resData.expirationIn
        );
        console.log(resData);

        console.log('is token valid' + resData.tokenValid);
        this.token = resData.access_token;
        console.log('access auth token ' + this.token);
        this.admin.next(admin);
        this.autoLogout(resData.expirationIn);
        localStorage.setItem('adminData', JSON.stringify(admin));
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = 'Verify your credentials and try again.';
    return throwError(errorMessage);
  }
}
