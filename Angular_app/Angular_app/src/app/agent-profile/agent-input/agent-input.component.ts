import { Component,Input, Output,EventEmitter,OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.css']
})
export class AgentInputComponent implements OnInit{
  @Input() field:string;
  @Input() datum:string;
  @Output() newItemEvent = new EventEmitter<string>();
  faPen=faPen;
  disabled=true;
  type="text"

  ngOnInit(){

    
  }
  onEdit(value:string)
  {
    this.disabled=!this.disabled;
    this.newItemEvent.emit(value);
    

  }




}
