import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgentFormComponent } from '../agent-form/agent-form.component';
import { HttpClient } from '@angular/common/http';
import { Agent } from '../Agent.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from 'src/app/agent-dashboard/shared-service.service';
import { ErrorPopupComponent } from 'src/app/client/creditors/error-popup/error-popup.component';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css'],
})
export class AdminCrudComponent implements OnInit {
  test: MatConfirmDialogComponent;
  addAgentform: FormGroup;
  updateAgentform: FormGroup;
  editMode: boolean = false;
  searchValue: string;

  constructor(
    private dialogRef: MatDialog,
    private http: HttpClient,
    private datePipe: DatePipe,
    private sharedService: SharedServiceService
  ) {
    this.updateAgentform = new FormGroup({
      id: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      cin: new FormControl(null, Validators.required),
      addresse: new FormControl(null, Validators.required),
      license: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      immatriculation: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      confirmationEmail: new FormControl(null, Validators.email),
      birthday: new FormControl(null, Validators.required),
      cinPicture: new FormControl(null, Validators.required),
    });

    this.addAgentform = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      cin: new FormControl(null, Validators.required),
      addresse: new FormControl(null, Validators.required),
      license: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),
      immatriculation: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      confirmationEmail: new FormControl(null, Validators.email),
      birthday: new FormControl(null, Validators.required),
      cinPicture: new FormControl(null, Validators.required),
    });
  }

  openAddDialog(): void {
    this.editMode = false;
    this.dialogRef.open(AgentFormComponent, {
      width: '60%',
      data: {
        formGroup: this.addAgentform,
        editMode: this.editMode,
        agents: this.agents,
      },
    });
  }

  openUpdateDialog(agent: Agent): void {
    this.editMode = true;
    console.log(agent.birthday);
    console.log('im here');

    //agent.birthday =this.formatDate(agent.birthday)
    console.log(agent.birthday);
    this.updateAgentform.patchValue({
      id: agent.id,
      immatriculation: agent.immatriculation,
      firstName: agent.firstName,
      lastName: agent.lastName,
      phone: agent.phone,
      email: agent.email,
      cin: agent.cin,
      addresse: agent.addresse,
      license: agent.license,
      cinPicture: agent.cinPicture,
      birthday: agent.birthday,
    });
    console.log('adrres', this.updateAgentform.value.birthday);

    this.dialogRef.open(AgentFormComponent, {
      width: '60%',
      data: {
        editMode: this.editMode,
        formGroup: this.addAgentform,
        FormGroup: this.updateAgentform,
        agents: this.agents,
        agent: this.updateAgentform.value,
      },
    });
  }

  formatDate(date: any): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }
  openDeleteDialog(agentId: string): void {
    // this.dialogService.openConfirmDialog();
    this.dialogRef.open(MatConfirmDialogComponent, {
      width: '390px',

      data: {
        element: 'agent',
        id: agentId,
      },
    });
  }

  agent: Agent;
  agents: Agent[];

  ngOnInit(): void {
    this.sharedService.searchValue$.subscribe((value) => {
      this.searchValue = value;
      // console.log(this.searchValue);
    });

    const request = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">\
    <Body>\
        <getAgentsRequest xmlns="http://example.com/agentservice"/>\
    </Body>\
</Envelope>`;

    const headers = {
      SOAPAction: 'https://jabaklah-production.up.railway.app/agents/getAgents',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    this.http
      .post('https://jabaklah-production.up.railway.app/ws', request, {
        headers: headers,
        responseType: 'text',
      })
      .subscribe((response: any) => {
        const parser = new DOMParser();
        const xmlResponse = parser.parseFromString(response, 'text/xml');
        const agentsXml = xmlResponse.getElementsByTagName('ns2:allAgents');
        console.log(response);

        this.agents = Array.from(agentsXml).map(
          (agentXml) => {
            return {
              id: agentXml.getElementsByTagName('ns2:agentId')[0].textContent,
              firstName:
                agentXml.getElementsByTagName('ns2:firstName')[0].textContent,
              lastName:
                agentXml.getElementsByTagName('ns2:lastName')[0].textContent,
              phone: agentXml.getElementsByTagName('ns2:phone')[0].textContent,
              email: agentXml.getElementsByTagName('ns2:email')[0].textContent,
              immatriculation: agentXml.getElementsByTagName(
                'ns2:immatriculation'
              )[0].textContent,
              addresse:
                agentXml.getElementsByTagName('ns2:addresse')[0].textContent,
              license:
                agentXml.getElementsByTagName('ns2:license')[0].textContent,
              cin: agentXml.getElementsByTagName('ns2:cin')[0].textContent,
              cinPicture:
                agentXml.getElementsByTagName('ns2:cinPicture')[0].textContent,
              birthday:
                agentXml.getElementsByTagName('ns2:birthday')[0].textContent,
            };
          },
          (error) => {
            console.log('error', error);
          }
        );
      });
  }
}
