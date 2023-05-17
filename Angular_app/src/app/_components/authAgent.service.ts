import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Agent } from './auth/agent.model';


export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  status: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTokenValid: boolean;
  expirationIn: number;
}

  

@Injectable({
  providedIn: 'root',
})
export class AgentAuthService {
    agent = new BehaviorSubject<Agent>(null);
  private tokenExpirationTimer: any;
  token: string;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    console.log('im in auto login');

    const agentData = JSON.parse(localStorage.getItem('agentData'));
    if (!agentData) {
      return;
    }
    const loadedAgent = new agentData(
      agentData.status,
      agentData.id,
      agentData.firstName,
      agentData.lastName,
      agentData.email,
      agentData.access_token,
      agentData.refresh_token,
      agentData._isTokenValid,
      agentData.expirationIn
    );

    if (loadedAgent._isTokenValid) {
      this.agent.next(loadedAgent);
      this.autoLogout(loadedAgent.expirationIn);
    }
  }

  autoLogout(expriationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expriationDuration);
  }

  logout() {
    const url = '/apis/api/v1/auth/logout';
    const token = JSON.parse(localStorage.getItem('agentData')).access_token;
    console.log(token);
    const body = {};

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        console.log('im logging out');

        this.agent.next(null);
        this.router.navigate(['/agentLogin']);
        localStorage.removeItem('agentData');
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
    return this.http.post<AuthResponseData>(url, body, { headers }).pipe(
      catchError(this.handleError),
      tap((resData) => {
        const agent = new Agent(
          resData.status,
          resData.id,
          resData.firstName,
          resData.lastName,
          resData.email,
          resData.access_token,
          resData.refresh_token,
          resData.isTokenValid,
          resData.expirationIn
        );

        this.token = resData.access_token;
        // console.log(this.token);

        this.autoLogout(resData.expirationIn);
        localStorage.setItem('agentData', JSON.stringify(agent));
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = 'Verify your credentials and try again.';
    return throwError(errorMessage);
  }
}
