import { Component,Input, Output,EventEmitter,OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-input',
  templateUrl: './client-input.component.html',
  styleUrls: ['./client-input.component.css']
})
export class ClientInputComponent {
  @Input() field:string="";
  @Input() datum:string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() type:string;
  faPen=faPen;
  disabled=true;

  onEdit(value:string)
  {
    this.disabled=!this.disabled;
    this.newItemEvent.emit(value);
  }




}
