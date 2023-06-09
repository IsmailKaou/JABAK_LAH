import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AgentAuthService } from '../authAgent.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() inputType: 'email' | 'phone';
  @Input() loginTitle: 'client' | 'agent';
  loginForm: FormGroup;

  error: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private agentAuthService: AgentAuthService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [
        this.inputType === 'email'
          ? Validators.email
          : Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
            ),
        Validators.required,
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit(FormData: any) {
    this.error = '';
    if (!this.loginForm.valid) {
      return;
    } else {
      const login = FormData.login;
      const password = FormData.password;
      console.log('your in login handler');

      const headers = { 'Content-Type': 'application/json' };

      if (this.loginTitle == 'client') {
        console.log('in client login');

        const url =
          'https://jabaklah-production.up.railway.app/api/v1/auth/authenticate';
        const body = {
          phoneNumber: login,
          password: password,
        };

        this.authService.authenticate(url, body, headers).subscribe(
          (response) => {
            console.log(response);

            console.log(response.status);
            if (response.status === 'VERIFIED_USER') {
              this.router.navigate(['/clientHome']);
            } else {
              this.router.navigate(['/reset-password']);
            }
          },
          (errorMessage) => {
            console.log(errorMessage);
            this.error = errorMessage;
          }
        );
      } else {
        const body = {
          email: login,
          password: password,
        };
        const url =
          'https://jabaklah-production.up.railway.app/api/v1/auth/authenticate/agent';
        this.agentAuthService.authenticate(url, body, headers).subscribe(
          (response) => {
            console.log(response);

            console.log(response.status);
            if (response.status === 'VERIFIED_USER') {
              this.router.navigate(['/agentDashboard']);
            } else {
              this.router.navigate(['/agent-reset-password']);
            }
          },
          (errorMessage) => {
            console.log(errorMessage);
            this.error = errorMessage;
          }
        );
      }
      this.loginForm.reset();
    }
  }
}
