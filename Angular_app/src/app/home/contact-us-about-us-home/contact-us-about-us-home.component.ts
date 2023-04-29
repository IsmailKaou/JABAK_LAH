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

  // name: string;
  // email: string;
  // body: string;

  contactForm: FormGroup;

  constructor(private builder: FormBuilder, private contact: EmailService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      body: new FormControl(null, Validators.required),
    });
  }

  onSubmit(FormData: any) {
    this.contactForm.value.name = null;
    this.contactForm.value.email = null;
    this.contactForm.value.body = null;
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
