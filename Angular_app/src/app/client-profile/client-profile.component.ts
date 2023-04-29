import { Component } from '@angular/core';
import { faCamera,faPen } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {
  faCam=faCamera;

  client: any={
    "First Name":"John",
    "Last Name":"Doe",
    "Email":"john.doe@gmail.com",
    "Phone":"+212678910",
    "Password":"myPassword",
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
    
    this.client[field]=newItem;
    console.log(newItem);

  }


/*   clientFields =  Object.keys(this.client).slice(0,-1);
 */
}
