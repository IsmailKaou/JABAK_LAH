import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-agent-crud',
  templateUrl: './agent-crud.component.html',
  styleUrls: ['./agent-crud.component.css']
})
export class AgentCrudComponent {

  constructor (private dialogRef:MatDialog){}

  openDialog():void {
    this.dialogRef.open(ClientFormComponent, {
      width:'60%'
    });
  }
}
