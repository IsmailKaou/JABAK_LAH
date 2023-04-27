import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us-about-us-home',
  templateUrl: './contact-us-about-us-home.component.html',
  styleUrls: ['./contact-us-about-us-home.component.css'],
})
export class ContactUsAboutUsHomeComponent {
  faCoffee = faCoffee;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.email, Validators.required]],
    });
  }
  onSubmit(form: FormGroup) {
    if (this.loginForm.invalid) {
      console.log('invalid');
    } else {
      console.log('Login', form.value.login);
    }
  }
}
