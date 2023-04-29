import { Component } from '@angular/core';
import { faCamera,faPen } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent {
  faCam=faCamera;

  agent: any={
    "First Name":"John",
    "Last Name":"Doe",
    "CIN":"EE123456",
    "Email":"john.doe@gmail.com",
    "Phone":"+212678910",
    "Birthday":"11/09/2001",
    "image":"../../../assets/Profile/profile.png",
  };
  constructor(private http: HttpClient) {}

  onFileChanged(event:any)
  {
    const selectedFile = event.target.files[0];
/*     const uploadData = new FormData();
    uploadData.append('myFile', selectedFile, selectedFile.name);
    this.http.post('backend', uploadData)
      .subscribe(); */
    console.log(selectedFile);
  }
  addItem(newItem:string,field:string)
  {
    
    this.agent[field]=newItem;
    console.log(newItem);

  }


  agentFields =  Object.keys(this.agent).slice(0,-1);

}
