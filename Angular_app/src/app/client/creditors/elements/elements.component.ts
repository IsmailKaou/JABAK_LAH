import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ElementsComponent {
  categories = ['recharges', 'factures'];
  creditors = [
    {
      name: 'Maroc Telecom Recharges',
      types: ['TELEPHONIE ET INTERNET SIM', 'Another One'],
      category: 'recharges',
      logo: '../../../assets/Home/Maroc Telecom.png',
    },
    {
      name: 'Maroc Telecom Factures',
      types: ['PRODUIT MOBILE SIM', 'PRODUIT FIXE SIM', 'PRODUIT INTERNET SIM'],
      category: 'factures',
      logo: '../../../assets/Home/Maroc Telecom.png',
    },
    {
      name: 'Redal',
      types: ['FACTURES REDAL'],
      category: 'factures',
      logo: '../../../assets/Home/Redal.jpg',
    },
    {
      name: 'Amendis Tanger',
      types: ['FACTURES AMENDIS TANGER'],
      category: 'factures',
      logo: '../../../assets/Home/Amendis Tanger.jpg',
    },
  ];

  selectedCategory: string = '';

  // filterCreditors(): any[] {
  //   if (this.selectedCategory === '') {
  //     return this.creditors;
  //   } else {
  //     return this.creditors.filter(
  //       (creditor) => creditor.category === this.selectedCategory
  //     );
  //   }
  // }

  // get filteredCreditors(): any[] {
  //   return this.filterCreditors();
  // }
}
