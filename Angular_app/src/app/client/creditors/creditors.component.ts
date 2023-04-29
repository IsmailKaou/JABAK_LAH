import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.css']
})
export class CreditorsComponent {
  category: number;
  categories = [
    { id: 1, name: 'WE Bills' },
    { id: 2, name: 'Donation' },
    { id: 3, name: 'Operators' }
  ];
  displayedColumns: string[] = ['creditor', 'amount', 'date'];
  bills =[
    {creditor : 'Maroc Telecom', amount: 50 , date :'12/12/2022'},
    {creditor : 'Redal', amount: 400 , date :'12/12/2022'}

  ]
}


