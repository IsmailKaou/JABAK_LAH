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
/*   constructor(
    private http: HttpClient,
    private router: Router
  ){}
  getForm(agentForm: any)
  {
    const url = '/apis/api/v2/auth/authenticate';
    const body ={
      email:agentForm.login,
      password:agentForm.password
    }
    console.log(body);
    const headers = { 'Content-Type': 'application/json' };
    this.http.post<AuthResponse>(url,body,{headers:headers}).subscribe(
    (res)=>{
      console.log(res);
      this.router.navigate(['/agentHome']);
    });


  } */
}
