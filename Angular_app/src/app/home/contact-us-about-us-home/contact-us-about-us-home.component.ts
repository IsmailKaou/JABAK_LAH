import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact-us-about-us-home',
  templateUrl: './contact-us-about-us-home.component.html',
  styleUrls: ['./contact-us-about-us-home.component.css'],
})
export class ContactUsAboutUsHomeComponent implements OnInit {
  faCoffee = faCoffee;

  name: string;
  email: string;

  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: EmailService) {}
  ngOnInit(): void {}

  onSubmit(FormData: any) {
    this.contact.sendEmail(FormData).subscribe(
      (response) => {
        location.href = 'https://mailthis.to/confirm';
      },
      (error) => {
        console.warn(error.responseText);
        console.log({ error });
      }
    );
  }
}
