import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() inputType: 'email' | 'phone';
  @Input() loginTitle: 'client' | 'agent';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}
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
  onSubmit(form: FormGroup) {
    if (this.loginForm.invalid) {
      console.log('invalid');
    } else {
      console.log('Login', form.value.login);
      console.log('Password', form.value.password);
      if (this.loginTitle == 'client') {
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
      }
    }
  }
}
