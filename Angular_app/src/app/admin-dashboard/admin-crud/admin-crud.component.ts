import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgentFormComponent } from '../agent-form/agent-form.component';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCrudComponent {
  constructor (private dialogRef:MatDialog){}

  openDialog():void {
    this.dialogRef.open(AgentFormComponent, {
      width:'60%'
    });
  }
}
