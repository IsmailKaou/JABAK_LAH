import { Component ,ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreditorsComponent {
  category: number;
  categories = [
    { id: 1, name: 'WE Bills' },
    { id: 2, name: 'Donation' },
    { id: 3, name: 'Operators' }
  ];
 
  activeTab :string ='List of Creditors'
  
  onTabClick(tab : any){
      this.activeTab = tab; 
  }
  
}


