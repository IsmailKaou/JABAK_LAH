import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AgentAuthService } from '../authAgent.service';
import { AuthAdminService } from '../auth-admin.service';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.css'],
})
export class AdminLoginFormComponent {
  loginForm: FormGroup;

  error: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private adminAuthService: AuthAdminService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.email, Validators.required]),
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
      console.log('your in login handler' + login);

      const headers = { 'Content-Type': 'application/json' };

      const body = {
        email: login,
        password: password,
      };
      const url = '/apis/api/v1/auth/authenticate/admin';
      this.adminAuthService.authenticate(url, body, headers).subscribe(
        (response) => {
          console.log(response);

          console.log(response.status);
          this.router.navigate(['/adminDashboard']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      );
      this.loginForm.reset();
    }
  }
}
