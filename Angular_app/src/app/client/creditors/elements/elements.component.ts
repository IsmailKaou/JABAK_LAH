import { Component, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import * as xml2js from 'xml2js';
import { Creancier, Creance } from './Creancier';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { MatDialog } from '@angular/material/dialog';

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
      types: ['TELEPHONIE ET INTERNET SIM'],
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
    {
      name: 'Orange Recharge',
      types: ['TELEPHONIE ET INTERNET SIM'],
      category: 'recharges',
      logo: '../../../assets/Home/Orange.png',
    },
    {
      name: 'Inwi Recharge',
      types: ['TELEPHONIE ET INTERNET SIM'],
      category: 'recharges',
      logo: '../../../assets/Home/Inwi.jpg',
    },
  ];

  selectedCategory: string = '';
  page: number = 1;
  itemsPerPage: number = 4;

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

  creanciers: Creancier[] = [];
  // private wsdlUrl = 'http://localhost:8080/creanciers?wsdl';
  // private endpointUrl = 'http://localhost:8080/your-webservice-url';
  private action = 'ListeCreanciers';
  // private soapHeader = `
  //   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/creanciers">
  //     <soapenv:Header/>
  //     <soapenv:Body>
  //       <ser:getCreanciersRequest/>
  //     </soapenv:Body>
  //   </soapenv:Envelope>
  // `;
  // private soapHeaders = new HttpHeaders({
  //   'Content-Type': 'text/xml;charset=UTF-8',
  //   'SOAPAction': this.action
  // });

  constructor(private http: HttpClient, private dialogRef: MatDialog) {}

  openDialog(formId: number, creanceId: number): void {
    console.log('the form id is ' + formId);
    PaymentFormComponent.formId = formId;
    PaymentFormComponent.creanceId = creanceId;

    this.dialogRef.open(PaymentFormComponent, {
      width: '40%',
    });
  }

  ngOnInit() {
    const request = `<?xml version="1.0" encoding="UTF-8"?> \
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> \
    <Body> \
        <getCreanciersRequest xmlns="http://example.com/creanciers" /> \

    </Body> \
    </Envelope>`;
    // const request='https://localhost:8081/getCreances';

    const headers = {
      SOAPAction: '/apis/ListeCreanciers',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    this.http
      .post('/apis/ws', request, {
        headers: headers,
        responseType: 'text',
      })
      .subscribe((response) => {
        const parser = new DOMParser();
        const xmlResponse = parser.parseFromString(response, 'text/xml');
        const creanciersList = xmlResponse.getElementsByTagName('creanciers');

        for (let i = 0; i < creanciersList.length; i++) {
          const creanciers = creanciersList[i];

          const code = creanciers.getElementsByTagName('code')[0].textContent;
          const name = creanciers.getElementsByTagName('name')[0].textContent;
          const category =
            creanciers.getElementsByTagName('category')[0].textContent;
          const image = creanciers.getElementsByTagName('image')[0].textContent;

          const creances = [];
          // if(creanciers.getElementsByTagName('creances').length!=0){
          // for(let j=0;j<creanciers.getElementsByTagName('creances').length;j++){
          //   const creancesId = parseInt(creanciers.getElementsByTagName('creances')[0].getElementsByTagName('id')[j].textContent);
          //   const creancesName = creanciers.getElementsByTagName('creances')[0].getElementsByTagName('name')[j].textContent;
          //   const creancesFormId = parseInt(creanciers.getElementsByTagName('creances')[0].getElementsByTagName('form')[j].getElementsByTagName('id')[0].textContent);

          //   const creance:Creance={
          //       id:creancesId,
          //       name:creancesName as string,
          //       formId:creancesFormId
          //   }
          //   creances.push(creance);
          // }
          // }

          if (creanciers.getElementsByTagName('creances').length != 0) {
            for (
              let j = 0;
              j < creanciers.getElementsByTagName('creances').length;
              j++
            ) {
              // console.log("these are "+creanciers.getElementsByTagName('creances')[j].getElementsByTagName('id')[0].textContent)
              const creancesId = parseInt(
                creanciers
                  .getElementsByTagName('creances')
                  [j].getElementsByTagName('id')[0].textContent
              );
              const creancesName = creanciers
                .getElementsByTagName('creances')
                [j].getElementsByTagName('name')[0].textContent;
              console.log(
                'this is the id of the form ' +
                  creanciers
                    .getElementsByTagName('creances')
                    [j].getElementsByTagName('form')[0]
              );
              const creancesFormId = parseInt(
                creanciers
                  .getElementsByTagName('creances')
                  [j].getElementsByTagName('form')[0]
                  .getElementsByTagName('id')[0].textContent
              );

              const creance: Creance = {
                id: creancesId,
                name: creancesName as string,
                formId: creancesFormId,
              };
              creances.push(creance);
            }
          }
          const creancier: Creancier = {
            code: code as string,
            name: name as string,
            category: category as string,
            image: image as string,
            creances: creances,
          };

          this.creanciers.push(creancier);
          console.log(creanciers);
        }
      });
  }
}
