import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  error: string = '';
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private resetPasswordService: ResetPasswordService
  ) {}
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
      {
        newPassword: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      this.passwordsMatchValidator
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword').value;
    const confirmPassword = form.get('confirmPassword').value;

    console.log(newPassword, confirmPassword);

    return newPassword === confirmPassword ? null : { passwordsNotMatch: true };
  }

  onSubmit(FormData: any) {
    this.error = '';

    if (!this.resetPasswordForm.valid) {
      return;
    } else {
      console.log('im in reset password submit');

      console.log(FormData.newPassword);

      const token = this.authService.token;
      const url = 'https://jabaklah-production.up.railway.app/api/v1/verify';
      this.resetPasswordService
        .resetPassword(FormData.newPassword, token, url)
        .subscribe(
          (response) => {
            this.router.navigate(['/clientHome']);
          },
          (errorMessage) => {
            console.log(errorMessage);
            this.error = errorMessage;
          }
        );
    }
    this.resetPasswordForm.reset();
  }
}
