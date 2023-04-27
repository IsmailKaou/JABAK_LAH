import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() inputType: 'email' | 'phone' = 'email';
  @Input() loginTitle: 'client' | 'agent';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          this.inputType === 'email'
            ? Validators.email
            : Validators.pattern(
                '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
              ),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
    });
  }
  onSubmit(form: FormGroup) {
    if (this.loginForm.invalid) {
      console.log('invalid');
    } else {
      console.log('Login', form.value.login);
      console.log('Password', form.value.password);
    }
  }
}
