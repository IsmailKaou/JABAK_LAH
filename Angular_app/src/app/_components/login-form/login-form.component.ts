import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() inputType: 'email' | 'phone' = 'email';
  @Input() loginTitle: 'client' | 'agent';
  loginForm: FormGroup;
  @Output() loginFormEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private router: Router) {}
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
  onSubmit(form: any) {
    if (this.loginForm.invalid) {
      console.log('invalid');
    } else {
      console.log('Login', form.login);
      console.log('Password', form.password);
      if (this.loginTitle == 'client') {
        this.router.navigate(['clientHome']);
      }
      else{
        this.loginFormEvent.emit(form);
      }
    }
  }
}
