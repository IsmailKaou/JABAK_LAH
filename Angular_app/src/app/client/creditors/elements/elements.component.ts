import { Component , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ElementsComponent {

  categories = ['recharges','factures'];
  creditors = [
    {name:'Maroc Telecom Recharges',category:'recharges'},
    {name:'Maroc Telecom Factures',category:'factures'},
    {name:'Redal',category:'factures'},
    {name:'Amendis Tanger',category:'factures'}
  ] ; 

  selectedCategory:string ="";
  

  filterCreditors(): any[] {
    if (this.selectedCategory === '') {
      return this.creditors;
    } else {
      return this.creditors.filter(creditor => creditor.category === this.selectedCategory);
    }
  }
  
  get filteredCreditors(): any[] {
    return this.filterCreditors();
  }

  

}
