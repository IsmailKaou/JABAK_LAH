import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent {
  message:string;
  static message: string;
  constructor(private dialogRef: MatDialogRef<ErrorPopupComponent>){
    this.message=ErrorPopupComponent.message
  }

  onClose(){
    this.dialogRef.close();
  }
  set setMessage(message:string){
    ErrorPopupComponent.message=message;
  }

}
