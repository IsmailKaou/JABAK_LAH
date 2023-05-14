import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit{
  form: FormGroup;
  wsResponse: any;
  isAgentCreated: boolean;  

  constructor(private fb: FormBuilder, private http: HttpClient,private dialogRef: MatDialogRef<AgentFormComponent>) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      cin: new FormControl(null,Validators.required),
      addresse: new FormControl(null,Validators.required),
      license: new FormControl(null,Validators.required),
      phone: new FormControl(null,[Validators.required,Validators.pattern(
        '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
      )]),
      immatriculation: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.email,Validators.required]),
      confirmationEmail:new FormControl(null,Validators.email),
      birthday: new FormControl(null,Validators.required),
      cinPicture :new FormControl(null,Validators.required),
     
    })
  }

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
  }
  onSubmit(FormData :any){
    console.log(FormData);
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
      SOAPAction: '/api/createAgent',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    this.http
      .post('/api/ws', request, {
        headers: headers,
        responseType: 'text',
      })
      .subscribe((response: string) => {
        const parser = new DOMParser();
        const xmlResponse = parser.parseFromString(response, 'text/xml');
        const isCreated = xmlResponse.getElementsByTagName('ns2:isCreated')[0].textContent === 'true';
        this.isAgentCreated = isCreated;
        if (isCreated) {
          console.log('Agent created successfully');
          this.wsResponse = 'Agent created successfully';
        } else {
          const errorMessage =
            xmlResponse.getElementsByTagName('ns2:errorMessage')[0].textContent;
          console.log(`Error creating Agent : ${errorMessage} `);
          this.wsResponse = errorMessage;
        }
      });
  }


}
