import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTokenValid: boolean;
  role:string;
}

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent {

}
