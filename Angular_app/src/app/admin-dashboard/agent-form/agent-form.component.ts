import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { Agent } from '../Agent.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css'],
})
export class AgentFormComponent implements OnInit {
  addAgentform: FormGroup;
  updateAgentform: FormGroup;
  wsResponse: any;
  isAgentCreated: boolean;
  isAgentUpdated: boolean;
  editMode: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AgentFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      formGroup: string;
      editMode: boolean;
      agents: Agent[];
      agent: Agent;
    }
  ) {}
  /*
    url = "./assets/home.png"

    onSelectFile(e:any){
      if(e.target.files){
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload= (event:any)=>{
          this.url = event.target.result ;
        }
      }
    }*/

  ngOnInit(): void {
    this.editMode = this.data.editMode;

    if (this.editMode) {
      console.log('Name', this.data.agent.cinPicture);

      console.log(this.data.agent.birthday);
      const bd = new Date(this.data.agent.birthday);
      this.updateAgentform = new FormGroup({
        id: new FormControl(this.data.agent.id),
        firstName: new FormControl(
          this.data.agent.firstName,
          Validators.required
        ),
        lastName: new FormControl(
          this.data.agent.lastName,
          Validators.required
        ),
        cin: new FormControl(this.data.agent.cin, Validators.required),
        addresse: new FormControl(
          this.data.agent.addresse,
          Validators.required
        ),
        license: new FormControl(this.data.agent.license, Validators.required),
        phone: new FormControl(this.data.agent.phone, [
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ]),
        immatriculation: new FormControl(
          this.data.agent.immatriculation,
          Validators.required
        ),
        email: new FormControl(this.data.agent.email, [
          Validators.email,
          Validators.required,
        ]),
        confirmationEmail: new FormControl(
          this.data.agent.email,
          Validators.email
        ),
        birthday: new FormControl(
          this.data.agent.birthday,
          Validators.required
        ),
        cinPicture: new FormControl(''),
      });
      //bd.toISOString().substr(0,10)
      console.log(this.data.agent.birthday);
    } else {
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
  }

  //Depends on the form we using
  getActiveForm(): FormGroup {
    return this.editMode ? this.updateAgentform : this.addAgentform;
  }

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
    window.location.reload();
  }
  onSubmit(FormData: any) {
    console.log(FormData);

    if (this.editMode) {
      const updateRequest = `<?xml version="1.0" encoding="UTF-8"?> \
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">\
      <Body>\
        <updateAgentRequest xmlns="http://example.com/agentservice">\
          <agentInfo>\
          <agentId>${FormData.id}</agentId>\
         <firstName>${FormData.firstName}</firstName>\
         <lastName>${FormData.lastName}</lastName>\
         <cin>${FormData.cin}</cin>\
         <addresse>${FormData.addresse}</addresse>\
         <email>${FormData.email}</email>\
         <phone>${FormData.phone}</phone>\
         <immatriculation>${FormData.immatriculation}</immatriculation>\
         <license>${FormData.license}</license>\
         <cinPicture>${FormData.cinPicture}</cinPicture>\
         <birthday>${FormData.birthday}</birthday>\
      </agentInfo>\
   </updateAgentRequest>\

      </Body>\
  </Envelope>`;
      console.log(updateRequest);
      const updateheaders = {
        SOAPAction: 'https://jabaklah-production.up.railway.app/updateAgent',
        'Content-Type': 'text/xml;charset=UTF-8',
      };

      this.http
        .post('https://jabaklah-production.up.railway.app/ws', updateRequest, {
          headers: updateheaders,
          responseType: 'text',
        })
        .subscribe((response: string) => {
          const parser = new DOMParser();
          const xmlResponse = parser.parseFromString(response, 'text/xml');
          const isUpdated =
            xmlResponse.getElementsByTagName('ns2:isUpdated')[0].textContent ===
            'true';
          this.isAgentUpdated = isUpdated;

          if (isUpdated) {
            console.log('Agent updated successfully');
            this.wsResponse = 'Agent updated successfully';
          } else {
            const errorMessage =
              xmlResponse.getElementsByTagName('ns2:errorMessage')[0]
                .textContent;
            console.log(`Error updating Agent : ${errorMessage} `);
            this.wsResponse = errorMessage;
          }
        });
    } else {
      const request = `<?xml version="1.0" encoding="UTF-8"?> \
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> \
        <Body> \
            <createAgentRequest xmlns="http://example.com/agentservice"> \
                <agentDetails>\
                    <firstName>${FormData.firstName}</firstName>\
                    <lastName>${FormData.lastName}</lastName>\
                    <cin>${FormData.cin}</cin>\
                    <addresse>${FormData.addresse}</addresse>\
                    <email>${FormData.email}</email>\
                    <phone>${FormData.phone}</phone>\
                    <immatriculation>${FormData.immatriculation}</immatriculation>\
                    <license>${FormData.license}</license>\
                    <cinPicture>${FormData.cinPicture}</cinPicture>\
                    <birthday>${FormData.birthday}</birthday>\
                </agentDetails>\
            </createAgentRequest>\
        </Body> \
    </Envelope>`;

      const headers = {
        SOAPAction: 'https://jabaklah-production.up.railway.app/createAgent',
        'Content-Type': 'text/xml;charset=UTF-8',
      };

      this.http
        .post('https://jabaklah-production.up.railway.app/ws', request, {
          headers: headers,
          responseType: 'text',
        })
        .subscribe((response: string) => {
          const parser = new DOMParser();
          const xmlResponse = parser.parseFromString(response, 'text/xml');
          const isCreated =
            xmlResponse.getElementsByTagName('ns2:isCreated')[0].textContent ===
            'true';
          this.isAgentCreated = isCreated;
          if (isCreated) {
            console.log('Agent created successfully');
            this.wsResponse = 'Agent created successfully';
          } else {
            const errorMessage =
              xmlResponse.getElementsByTagName('ns2:errorMessage')[0]
                .textContent;
            console.log(`Error creating Agent : ${errorMessage} `);
            this.wsResponse = errorMessage;
          }
        });
    }
  }
}
