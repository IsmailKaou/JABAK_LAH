import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  addClientForm: FormGroup;
  wsResponse: any;
  isClientCreated: boolean;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      ceiling: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      email: new FormControl(null, [Validators.email]),
    });
  }

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
  }

  onSubmit(FormData: any) {
    console.log('hello!');

    const request = `<?xml version="1.0" encoding="UTF-8"?> \
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> \
          <Body> \
              <createClientRequest xmlns="http://example.com/clientservice"> \
                  <clientDetails>\
                      <firstName>${FormData.firstName}</firstName>\
                      <lastName>${FormData.lastName}</lastName>\
                      <phoneNumber>${FormData.phoneNumber}</phoneNumber>\
                      <ceiling>${FormData.ceiling}</ceiling>\
                      <emailAddress>${FormData.email}</emailAddress>\
                  </clientDetails>\
              </createClientRequest>\
          </Body> \
      </Envelope>`;

    const headers = {
      SOAPAction: '/apis/createClient',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    this.http
      .post('/apis/ws', request, {
        headers: headers,
        responseType: 'text',
      })
      .subscribe((response: string) => {
        const parser = new DOMParser();
        const xmlResponse = parser.parseFromString(response, 'text/xml');
        const isCreated =
          xmlResponse.getElementsByTagName('ns2:isCreated')[0].textContent ===
          'true';
        this.isClientCreated = isCreated;
        if (isCreated) {
          console.log('Client created successfully');
          this.wsResponse = 'Client created successfully';
        } else {
          const errorMessage =
            xmlResponse.getElementsByTagName('ns2:errorMessage')[0].textContent;
          console.log(`Error creating Client : ${errorMessage} `);
          this.wsResponse = errorMessage;
        }
      });
  }
}
