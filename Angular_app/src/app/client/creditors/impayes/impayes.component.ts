// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Impaye } from './Impaye';
// import { ActivatedRoute } from '@angular/router';
// // import { parseBooleans } from 'xml2js/lib/processors';
// import { ErrorPopupComponent } from '../error-popup/error-popup.component';
// import { MatDialog } from '@angular/material/dialog';
// import { CodeVerificationComponent } from '../code-verification/code-verification.component';

// @Component({
//   selector: 'app-impayes',
//   templateUrl: './impayes.component.html',
//   styleUrls: ['./impayes.component.css']
// })
// export class ImpayesComponent {

//     clientPhone:string;
//     creanceId:number;
//     impayes:Impaye[]=[];

// constructor(private http: HttpClient,private route: ActivatedRoute,private dialogRef:MatDialog){}

//     ngOnInit() {
//       this.route.queryParams.subscribe(params => {
//         this.creanceId = params['creanceId'];
//         this.clientPhone= params['clientPhone'];
//       });
//       const request = `<?xml version="1.0" encoding="UTF-8"?> \
//       <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes"> \
//           <soapenv:Header/> \
//           <soapenv:Body> \
//           <ser:getImpayesRequest >\
//           <clientPhone>${this.clientPhone}</clientPhone>\
//            <creanceId>${this.creanceId}</creanceId>\
//           </ser:getImpayesRequest>  \        </soapenv:Body> \
//       </soapenv:Envelope>`;

//       const headers = {
//         SOAPAction: '/apis/GetImpayes',
//         'Content-Type': 'text/xml;charset=UTF-8',
//       };

//   this.http
//   .post('/apis/ws', request, {
//     headers: headers,
//     responseType: 'text',
//   })  .subscribe((response) => {
//             const parser = new DOMParser();
//           const xmlResponse = parser.parseFromString(response, 'text/xml');
//           const impayes = xmlResponse.getElementsByTagName('impayes');

//           for (let i = 0; i < impayes.length; i++) {
//             const id = parseInt( impayes[i].getElementsByTagName('id')[0].textContent);
//             const name = impayes[i].getElementsByTagName('name')[0].textContent;
//             const amount = parseFloat(impayes[i].getElementsByTagName('amount')[0].textContent);
//             const type = impayes[i].getElementsByTagName('type')[0].textContent;
//             const isPayed=type === 'Penalty' || type === 'Cost'?true:false;
//             const impaye:Impaye = {
//               id:id ,
//               name: name ,
//               amount: amount,
//               type:type,
//               isPayed:isPayed
//             };
//             this.impayes.push(impaye)
//           }
//      })
//      console.log("the length is " +this.impayes.length)
//     }

//      paye(){

//       let totalAmount = 0;
//       this.impayes.filter(impaye => impaye.isPayed).forEach(impaye => {
//         console.log(impaye.name)
//         totalAmount += impaye.amount;
//       });

//               const request = `<?xml version="1.0" encoding="UTF-8"?>\
//               <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/clientservice">\
//                   <soapenv:Header/>\
//                   <soapenv:Body>\
//                       <ser:paymentRequest >\
//                       <phone>${this.clientPhone}</phone>\
//                        <amount>${totalAmount}</amount>\
//                       </ser:paymentRequest>\
//                   </soapenv:Body>\
//               </soapenv:Envelope>`;

//               const headers = {
//                 SOAPAction: '/apis/GetImpayes',
//                 'Content-Type': 'text/xml;charset=UTF-8',
//               };

//           this.http
//           .post('/apis/ws', request, {
//             headers: headers,
//             responseType: 'text',
//           })  .subscribe((response) => {
//                     const parser = new DOMParser();
//                   const xmlResponse = parser.parseFromString(response, 'text/xml');
//                   const canClientPaye =xmlResponse.getElementsByTagName('canClientPaye')[0].textContent;
//                   const message = xmlResponse.getElementsByTagName('message')[0].textContent;
//                   console.log(canClientPaye)
//                 if(canClientPaye==='false'){
//                   this.openErrorDialog(message)

//                 }
//                 else{
//                   this.openCodeVerificationDialog()
//                 }

//              })
//      }
//   openErrorDialog(message: string) {
//     ErrorPopupComponent.message=message;
//     this.dialogRef.open(ErrorPopupComponent, {
//     });  }
// openCodeVerificationDialog(){
//   this.dialogRef.open(CodeVerificationComponent, {
//   });
// }
//   }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Impaye } from './Impaye';
import { ActivatedRoute } from '@angular/router';
// import { parseBooleans } from 'xml2js/lib/processors';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CodeVerificationComponent } from '../code-verification/code-verification.component';

@Component({
  selector: 'app-impayes',
  templateUrl: './impayes.component.html',
  styleUrls: ['./impayes.component.css'],
})
export class ImpayesComponent {
  clientPhone: string;
  creanceId: number;
  impayes: Impaye[] = [];
  shouldShowButton = this.impayes.some((impaye) => impaye.isPayed);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.creanceId = params['creanceId'];
      this.clientPhone = params['clientPhone'];
    });
    const request = `<?xml version="1.0" encoding="UTF-8"?> \
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes"> \
          <soapenv:Header/> \
          <soapenv:Body> \
          <ser:getImpayesRequest >\
          <clientPhone>${this.clientPhone}</clientPhone>\
           <creanceId>${this.creanceId}</creanceId>\
          </ser:getImpayesRequest>  \        </soapenv:Body> \
      </soapenv:Envelope>`;

    const headers = {
      SOAPAction: '/apis/GetImpayes',
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
        const impayes = xmlResponse.getElementsByTagName('impayes');

        for (let i = 0; i < impayes.length; i++) {
          const id = parseInt(
            impayes[i].getElementsByTagName('id')[0].textContent
          );
          const name = impayes[i].getElementsByTagName('name')[0].textContent;
          const amount = parseFloat(
            impayes[i].getElementsByTagName('amount')[0].textContent
          );
          const type = impayes[i].getElementsByTagName('type')[0].textContent;
          console.log('the type of the impaye is ' + type);
          const isPayed = type === 'Penalty' || type === 'Cost' ? true : false;
          const impaye: Impaye = {
            id: id,
            name: name,
            amount: amount,
            type: type,
            isPayed: isPayed,
          };
          this.impayes.push(impaye);
        }
      });
    console.log('the length is ' + this.impayes.length);
  }

  paye() {
    console.log(
      'the length of ispayed ' +
        this.impayes.filter((impaye) => impaye.isPayed).length
    );

    if (this.impayes.filter((impaye) => impaye.isPayed).length == 0) {
      this.openErrorDialog('No invoices were selected!');
    } else {
      let totalAmount = 0;
      this.impayes
        .filter((impaye) => impaye.isPayed)
        .forEach((impaye) => {
          console.log(impaye.name);
          totalAmount += impaye.amount;
        });

      const request = `<?xml version="1.0" encoding="UTF-8"?>\
              <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/clientservice">\
                  <soapenv:Header/>\
                  <soapenv:Body>\
                      <ser:paymentRequest >\
                      <phone>${this.clientPhone}</phone>\
                       <amount>${totalAmount}</amount>\
                      </ser:paymentRequest>\
                  </soapenv:Body>\
              </soapenv:Envelope>`;

      const headers = {
        SOAPAction: '/apis/GetImpayes',
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
          const canClientPaye =
            xmlResponse.getElementsByTagName('canClientPaye')[0].textContent;
          const message =
            xmlResponse.getElementsByTagName('message')[0].textContent;
          console.log(canClientPaye);
          if (canClientPaye === 'false') {
            this.openErrorDialog(message);
          } else {
            this.openCodeVerificationDialog();
          }
        });
    }
  }

  openErrorDialog(message: string) {
    ErrorPopupComponent.message = message;
    this.dialogRef.open(ErrorPopupComponent, {});
  }

  openCodeVerificationDialog() {
    CodeVerificationComponent.impayes = this.impayes;
    CodeVerificationComponent.amount = 500;

    this.dialogRef.open(CodeVerificationComponent, {});
  }
}
