import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { Client } from 'src/app/agent-dashboard/Client.model';


@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent   {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data : {id : string , element: string},

  public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
  private http: HttpClient,
  
  )
  {

  }
  
 

  isClientDeleted : boolean ; 
  isAgentDeleted : boolean ;
  wsResponse: any;

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
    window.location.reload() ;

  }

  ngOnInit(){

      console.log("im on delete")

  }
  onDelete(){
    if(this.data.element == 'client'){

    const request= `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">\
                        <Body>\
                          <deleteClientRequest xmlns="http://example.com/clientservice">\
                                <id>${this.data.id}</id>\
                          </deleteClientRequest>\
                        </Body>\
                    </Envelope>`
   
    
    
    const headers = {
      SOAPAction: '/apis/deleteClient',
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
      const isDeleted =
        xmlResponse.getElementsByTagName('ns2:isDeleted')[0].textContent ===
        'true';
        this.isClientDeleted = isDeleted ;
  
  
        window.location.reload() ;

  

  });


  }else{

    console.log(this.data.id)
    console.log("heloo")
    const request= `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">\
                        <Body>\
                        <deleteAgentRequest xmlns="http://example.com/agentservice">\
                        <id>${this.data.id}</id>\
                     </deleteAgentRequest>\
               
                        </Body>\
                    </Envelope>`
   
    
                    console.log(request)

    
    const headers = {
      SOAPAction: '/apis/deleteAgent',
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
      const isDeleted =
        xmlResponse.getElementsByTagName('ns2:isDeleted')[0].textContent ===
        'true';
        this.isAgentDeleted = isDeleted ;
        window.location.reload() ;

      
});
   
  

    this.dialogRef.close();
  }

}
            

}
