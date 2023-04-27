import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      login: '',
      password: '',
    });
  }
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Login', form.value.login);
    console.log('Password', form.value.password);
  }
}
