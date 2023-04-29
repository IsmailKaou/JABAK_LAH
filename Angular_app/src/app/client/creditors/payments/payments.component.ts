import { Component } from '@angular/core';
import { Payment } from './payment.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  displayedColumns: string[] = ['creditor', 'amount', 'date'];
  
  bills : Payment[] =[
    {creditor : 'Maroc Telecom', amount: 50 , date :'12/12/2022'},
    {creditor : 'Redal', amount: 400 , date :'12/12/2022'}

  ]
  //This method will be called whenever a user makes a purchase 
  addBill(bill:Payment){
    this.bills.push(bill);
  }
}
