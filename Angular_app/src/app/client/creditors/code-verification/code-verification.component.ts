// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Impaye } from '../impayes/Impaye';
// import { Router } from '@angular/router';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-code-verification',
//   templateUrl: './code-verification.component.html',
//   styleUrls: ['./code-verification.component.css']
// })

// export class CodeVerificationComponent {
//   code:string
//   userPhone:string= localStorage.getItem('phoneNumber');
//   userValid:boolean
//   errorMessage="The provided code doesn't match the one that we sent, please verify again."
//    static impayes:Impaye[]
//    ids:number[];
//    static amount:number

//   constructor( private http: HttpClient,private router: Router,private dialogRef: MatDialogRef<CodeVerificationComponent>){
//   }

//   ngOnInit() {

//     const request = `<?xml version="1.0" encoding="UTF-8"?>\
//     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes">\
//         <soapenv:Header/>\
//         <soapenv:Body>\
//             <ser:verifyPhoneRequest >\
//             <phone>212659522438</phone>\
//             </ser:verifyPhoneRequest>\
//         </soapenv:Body>\
//     </soapenv:Envelope>`;

//     const headers = {
//       SOAPAction: '/apis/ClientVerification',
//       'Content-Type': 'text/xml;charset=UTF-8',
//     };

// this.http
// .post('/apis/ws', request, {
//   headers: headers,
//   responseType: 'text',
// })  .subscribe((response) => {
//           const parser = new DOMParser();
//         const xmlResponse = parser.parseFromString(response, 'text/xml');
//         this.code = xmlResponse.getElementsByTagName('verificationCode')[0].textContent;
//         console.log(this.code)
// // console.log(localStorage.getItem('phoneNumber'))
// }) }
//   verifyClient(code:string){
// if(code==this.code){
//   console.log("the user is valid")
//   this.userValid=true
// this.ids=CodeVerificationComponent.impayes
//           .filter(impaye => impaye.isPayed)
//           .map(impaye => impaye.id);
// CodeVerificationComponent.impayes
//           .filter(impaye => impaye.isPayed)
//           .reduce((total, impaye) => total + impaye.amount, 0);
//           this.payeBills()
//           this.onClose()
//       this.router.navigate(['/clientHome']);
// }
// else{
//   console.log("the user is not valid")
//   this.userValid=false

// }
//   }

// payeBills() {
// console.log(CodeVerificationComponent.amount)

// const impayesString: string = this.ids.map(id => `<impayesIds>${id}</impayesIds>`).join('\n');

//   const request = `<?xml version="1.0" encoding="UTF-8"?>\
//   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes">\
//       <soapenv:Header/>\
//       <soapenv:Body>\
//         <ser:payeImpayesRequest >\
//         <phone>0659522438</phone>\
//        <amount>${CodeVerificationComponent.amount}</amount>\
//           ${impayesString}\
//         </ser:payeImpayesRequest>\
//       </soapenv:Body>\
//   </soapenv:Envelope>`;

//   const headers = {
//     SOAPAction: '/apis/ClientVerification',
//     'Content-Type': 'text/xml;charset=UTF-8',
//   };

// this.http
// .post('/apis/ws', request, {
// headers: headers,
// responseType: 'text',
// })  .subscribe((response) => {
//         const parser = new DOMParser();
//       const xmlResponse = parser.parseFromString(response, 'text/xml');
//       console.log(xmlResponse)
// //       this.code = xmlResponse.getElementsByTagName('verificationCode')[0].textContent;
// //       console.log(this.code)
// // console.log(localStorage.getItem('phoneNumber'))
// })
// }
// onClose(){
//   this.dialogRef.close();

// }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Impaye } from '../impayes/Impaye';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css'],
})
export class CodeVerificationComponent {
  code: string;
  userPhone: string = localStorage.getItem('clientData')['phoneNumber'];
  userValid: boolean;
  errorMessage =
    "The provided code doesn't match the one that we sent, please verify again.";
  static impayes: Impaye[];
  ids: number[];
  static amount: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<CodeVerificationComponent>
  ) {}

  ngOnInit() {
    console.log('locale' + localStorage.getItem('clientData'));
    var clientData = JSON.parse(localStorage.getItem('clientData'));

    console.log('phone' + clientData.phoneNumber);
    const request = `<?xml version="1.0" encoding="UTF-8"?>\
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes">\
        <soapenv:Header/>\
        <soapenv:Body>\
            <ser:verifyPhoneRequest >\
            <phone>212633166669</phone>\
            </ser:verifyPhoneRequest>\
        </soapenv:Body>\
    </soapenv:Envelope>`;

    const headers = {
      SOAPAction: '/apis/ClientVerification',
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
        this.code =
          xmlResponse.getElementsByTagName('verificationCode')[0].textContent;
        console.log(this.code);
        // console.log(localStorage.getItem('phoneNumber'))
      });
  }
  verifyClient(code: string) {
    if (code == this.code) {
      console.log('the user is valid');
      this.userValid = true;
      this.ids = CodeVerificationComponent.impayes
        .filter((impaye) => impaye.isPayed)
        .map((impaye) => impaye.id);
      CodeVerificationComponent.impayes
        .filter((impaye) => impaye.isPayed)
        .reduce((total, impaye) => total + impaye.amount, 0);
      this.payeBills();
      this.onClose();
      this.router.navigate(['/clientHome']);
    } else {
      console.log('the user is not valid');
      this.userValid = false;
    }
  }

  payeBills() {
    console.log('locale' + localStorage.getItem('clientData'));
    const clientData = JSON.parse(localStorage.getItem('clientData'));
    const phoneNumber = clientData.phoneNumber;
    // console.log('phone' + clientData.phoneNumber);
    // console.log(CodeVerificationComponent.amount);

    const impayesString: string = this.ids
      .map((id) => `<impayesIds>${id}</impayesIds>`)
      .join('\n');

    const request = `<?xml version="1.0" encoding="UTF-8"?>\
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes">\
      <soapenv:Header/>\
      <soapenv:Body>\
        <ser:payeImpayesRequest >\
        <phone>${phoneNumber}</phone>\
       <amount>${CodeVerificationComponent.amount}</amount>\
          ${impayesString}\
        </ser:payeImpayesRequest>\
      </soapenv:Body>\
  </soapenv:Envelope>`;

    const headers = {
      SOAPAction: '/apis/ClientVerification',
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
        console.log(xmlResponse);
        //       this.code = xmlResponse.getElementsByTagName('verificationCode')[0].textContent;
        //       console.log(this.code)
        // console.log(localStorage.getItem('phoneNumber'))
      });
  }
  onClose() {
    this.dialogRef.close();
  }
}
