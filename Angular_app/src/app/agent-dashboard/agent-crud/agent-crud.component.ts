import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { HttpClient } from '@angular/common/http';
import { Client } from '../Client.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatConfirmDialogComponent } from '../../admin-dashboard/mat-confirm-dialog/mat-confirm-dialog.component';
import { GetClientsService } from 'src/app/_components/get-clients.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-agent-crud',
  templateUrl: './agent-crud.component.html',
  styleUrls: ['./agent-crud.component.css'],
})
export class AgentCrudComponent {
  addClientForm: FormGroup;
  updateClientForm: FormGroup;
  editMode: boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private http: HttpClient,
    private getClientsService: GetClientsService,
    private sharedService: SharedServiceService
  ) {
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

    this.updateClientForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      ceiling: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      emailAddress: new FormControl(null, [Validators.email]),
    });
  }
  //Add client dialog
  openAddDialog(): void {
    this.editMode = false;
    console.log('add mode');

    this.dialogRef.open(ClientFormComponent, {
      width: '60%',
      data: {
        formGroup: this.addClientForm,
        editMode: this.editMode,
        clients: this.clients,
        // updateClientSubject: this.updateClientSubject
      },
    });
    console.log(this.editMode);
  }
  //Delete client dialog
  openDeleteDialog(clientId: string): void {
    console.log(clientId);

    // this.dialogService.openConfirmDialog();
    this.dialogRef.open(MatConfirmDialogComponent, {
      width: '390px',
      data: {
        element: 'client',
        id: clientId,
      },
    });
  }

  //Update client dialog
  openUpdateDialog(client: Client): void {
    this.editMode = true;
    console.log('edit mode');

    this.updateClientForm.patchValue({
      id: client.id,
      ceiling: client.ceiling,
      firstName: client.firstName,
      lastName: client.lastName,
      phoneNumber: client.phoneNumber,
      emailAddress: client.emailAddress,
    });
    this.dialogRef.open(ClientFormComponent, {
      width: '60%',
      data: {
        formGroup: this.updateClientForm,
        FormGroup: this.addClientForm,
        editMode: this.editMode,
        clients: this.clients,
        client: this.updateClientForm.value,
      },
    });

    // this.updateClientForm.patchValue({
    //   id:client.id,
    //   ceiling: client.ceiling,
    //   firstName: client.firstName,
    //   lastName: client.lastName,
    //   phoneNumber: client.phoneNumber,
    //   email: client.emailAddress,
    // });
  }
  searchValue: string;

  clients: Client[];
  client: Client;
  clientForm: ClientFormComponent;
  filterCeiling: string = 'Customers with ceiling';

  handleFilterChange() {}
  setClients(clients: Client[]): void {
    this.clients = clients;
  }

  ngOnInit(): void {
    this.sharedService.searchValue$.subscribe((value) => {
      this.searchValue = value;
      // console.log(this.searchValue);
    });
    this.getClientsService.fetchClient().subscribe((response: any) => {
      const parser = new DOMParser();
      const xmlResponse = parser.parseFromString(response, 'text/xml');
      const clientsXml = xmlResponse.getElementsByTagName('ns2:allClients');
      console.log(response);

      this.clients = Array.from(clientsXml).map(
        (clientXml) => {
          return {
            id: clientXml.getElementsByTagName('ns2:clientId')[0].textContent,
            firstName:
              clientXml.getElementsByTagName('ns2:firstName')[0].textContent,
            lastName:
              clientXml.getElementsByTagName('ns2:lastName')[0].textContent,
            phoneNumber:
              clientXml.getElementsByTagName('ns2:phoneNumber')[0].textContent,
            ceiling:
              clientXml.getElementsByTagName('ns2:ceiling')[0].textContent,
            emailAddress:
              clientXml.getElementsByTagName('ns2:emailAddress')[0].textContent,
          };
        },
        (error) => {
          console.log('error', error);
        }
      );
    });
  }
}
