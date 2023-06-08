import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, EventEmitter, Inject, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../Client.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GetClientsService } from 'src/app/_components/get-clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  addClientForm: FormGroup;
  updateClientForm: FormGroup;
  wsResponse: any;
  isClientCreated: boolean;
  isClientUpdated: boolean;
  editMode: boolean = false;

  @Output() clientChanged = new EventEmitter<Client[]>();

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      formGroup: string;
      editMode: boolean;
      clients: Client[];
      client: Client;
    }
  ) {}

  clients: Client[];
  cats = [];

  //client : Client
  ngOnInit(): void {
    console.log('liste', this.data.clients);

    // console.log(this.data.client.id)
    //si editMethod= true => show populated fields
    this.editMode = this.data.editMode;
    if (this.editMode) {
      this.updateClientForm = new FormGroup({
        id: new FormControl(this.data.client.id),
        ceiling: new FormControl(this.data.client.ceiling, Validators.required),
        firstName: new FormControl(
          this.data.client.firstName,
          Validators.required
        ),
        lastName: new FormControl(
          this.data.client.lastName,
          Validators.required
        ),
        phoneNumber: new FormControl(this.data.client.phoneNumber, [
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ]),
        email: new FormControl(this.data.client.emailAddress, [
          Validators.email,
        ]),
      });
      //la liste des clients updated
      console.log(this.data.client.emailAddress);
    } else {
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

      console.log('hello therrree email is here');
    }

    //console.log(this.addClientForm.hasError)
  }
  getActiveForm(): FormGroup {
    return this.editMode ? this.updateClientForm : this.addClientForm;
  }

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
    // this.router.navigate['/agentDashboard'];

    window.location.reload();
  }

  onSubmit(FormData: any) {
    //  console.log(FormData.firstName)

    if (this.editMode) {
      const updateRequest = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
          <updateClientRequest xmlns="http://example.com/clientservice">
          <clientId>${FormData.id}</clientId>
              <clientInfo>
                  <firstName>${FormData.firstName}</firstName>
                  <lastName>${FormData.lastName}</lastName>
                  <phoneNumber>${FormData.phoneNumber}</phoneNumber>
                  <ceiling>${FormData.ceiling}</ceiling>
                  <emailAddress>${FormData.email}</emailAddress>
              </clientInfo>
          </updateClientRequest>
      </Body>
  </Envelope>`;
      const updateheaders = {
        SOAPAction: '/apis/updateClient',
        'Content-Type': 'text/xml;charset=UTF-8',
      };

      this.http
        .post('/apis/ws', updateRequest, {
          headers: updateheaders,
          responseType: 'text',
        })
        .subscribe((response: string) => {
          const parser = new DOMParser();
          const xmlResponse = parser.parseFromString(response, 'text/xml');
          const isUpdated =
            xmlResponse.getElementsByTagName('ns2:isUpdated')[0].textContent ===
            'true';
          this.isClientUpdated = isUpdated;

          if (isUpdated) {
            console.log('Client updated successfully');
            this.wsResponse = 'Client updated successfully';
            this.clientChanged.emit(this.clients);
            this.cats = this.clients;
            for (const clt of this.data.clients) {
              if (clt.id == FormData.id) {
                console.log('test');
                console.log('hello', clt);
              }
            }
          } else {
            const errorMessage =
              xmlResponse.getElementsByTagName('ns2:errorMessage')[0]
                .textContent;
            console.log(`Error updating Client : ${errorMessage} `);
            this.wsResponse = errorMessage;
            this.clientChanged.emit(this.clients);
          }
        });
    } else {
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
            // Emit a value
          } else {
            const errorMessage =
              xmlResponse.getElementsByTagName('ns2:errorMessage')[0]
                .textContent;
            console.log(`Error creating Client : ${errorMessage} `);
            this.wsResponse = errorMessage;
          }
        });
    }
  }
  //returns the form depending on editMode variable
}
