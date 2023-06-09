import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators,  FormControl} from '@angular/forms';
import { Field } from './Field';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  form: FormGroup;
 // formControls :FormControl;
  
 // private dialogErrorRef: MatDialogRef<ErrorPopupComponent>;

  static formId:number;
  static creanceId:number;
  fields: Field[] = [

];
  constructor( private http: HttpClient,private formBuilder: FormBuilder,private dialogErrorRef:MatDialog,private dialogRef: MatDialogRef<PaymentFormComponent>,private router: Router) { 
    

      this.form = this.formBuilder.group({});
    }

  submitForm() {
    if (this.form.valid) {
      // Form submission logic here
    } else {
      // Handle invalid form
    }
  }

  // buildForm() {

  //   const formControls = {};

  //   for (const field of this.fields) {
  //     formControls[field.name] = new FormControl('');
  //     console.log("i am here")
  //   }
  //   this.form = this.formBuilder.group(formControls);  
  //   // this.form=new FormGroup(formControls)
  // }

  // validate(){
  // this.form = this.formBuilder.group({
  //   email: ['', [ Validators.email]],
  //   phone:['', [
  //     Validators.required,
  //     Validators.pattern(
  //       '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
  //     ),
  //   ]],
  //   name:['',[Validators.required, Validators.minLength(4),Validators.pattern('[a-zA-Z ]*')]]
  // });
  // }
    
  ngOnInit() {
    console.log("the form id that i received is "+PaymentFormComponent.formId)

      // this.buildForm();
    const request = `<?xml version="1.0" encoding="UTF-8"?> \
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/creanceForm"> \
        <soapenv:Header/> \
        <soapenv:Body> \
            <ser:getFormsRequest ><id>${PaymentFormComponent.formId}</id></ser:getFormsRequest> \
        </soapenv:Body> \
    </soapenv:Envelope>`;

    const headers = {
      SOAPAction: '/apis/GetForms',
      'Content-Type': 'text/xml;charset=UTF-8',
    };



this.http
.post('/apis/ws', request, {
  headers: headers,
  responseType: 'text',
})  .subscribe((response) => {
          const parser = new DOMParser();
        const xmlResponse = parser.parseFromString(response, 'text/xml');
        const fields = xmlResponse.getElementsByTagName('fields');
    const formControls = {};

        for (let i = 0; i < fields.length; i++) {
          const id = parseInt( fields[i].getElementsByTagName('id')[0].textContent);
          const type = fields[i].getElementsByTagName('type')[0].textContent;
          const name = fields[i].getElementsByTagName('name')[0].textContent;
          let validators = [];

          if (type === 'email') {
            validators.push(Validators.email);
            console.log("that is true ")
          }
          if(name==='client_phone'){
            validators.push(Validators.required,Validators.pattern('^[0-9]{10}$'));
          }
          if(name==='client_name'){
            validators.push(Validators.required, Validators.minLength(4),Validators.pattern('^[a-zA-Z]+$'));
          }
          
          this.form.addControl(name, this.formBuilder.control('', validators));
          this.form.addControl('client_email', this.formBuilder.control('', [Validators.email,Validators.required]));

          const field :Field=new Field(id,type,name);
          this.fields.push(field)
        //  formControls[field.name] = new FormControl('');
        //  this.form.addControl(name,[])
          console.log("i am here")
    }
    //  this.form = this.formBuilder.group(formControls);  
     // console.log(formControls)
     this.generateFormControls();
   }) }

  
    generateFormControls(){
      for (let field of this.fields) {
        let validators = [];
        
        if (field.type === 'email') {
          validators.push(Validators.email);
        }
        
        this.form.addControl(field.name, this.formBuilder.control('', validators));
      }
    }


  onSubmit() {
    // this.validate();
    let phone=this.form.get('client_phone');
    console.log("this is the value "+phone.value)
   // this.checkClient(phone.value,PaymentFormComponent.creanceId)
    // const isValid = this.fields.every((field) => !this.isFieldInvalid(field.name));
    // this.updateFieldErrorMessage('client_phone')

    // if (isValid) {
    //   this.checkClient(phone.value,PaymentFormComponent.creanceId);
    // }
    let allFieldsValid = true;

this.fields.forEach((field) => {
  this.updateFieldErrorMessage(field.name);

  if (this.isFieldInvalid(field.name)) {
    allFieldsValid = false;
  }
});

if (allFieldsValid) {
  this.checkClient(phone.value,PaymentFormComponent.creanceId);
}
  

    // this.generateFormControls()
    // let client_phone=(<HTMLInputElement>document.querySelector('input[name=client_phone]')).value
    // console.log(client_phone)
    
   // console.log(this.form.get('client_phone').value);
    
  }

  onClose(){
    this.dialogRef.close();
  }

  // get formFields(){

  //   return (Object.keys(this.form.controls));
  // }
      
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return  control?.invalid;
  }

  updateFieldErrorMessage(fieldName: string) {
    const control = this.form.get(fieldName);
    console.log("i am being called again")

    if (control?.hasError('required')) {
      this.fields.find(field => field.name === fieldName).errorMessage = 'Field is required.';
    }
     else if (control?.hasError('email')) {
      this.fields.find(field => field.name === fieldName).errorMessage = 'Invalid email format.';
    } 
    else if(control?.hasError('pattern')) { 
 
      console.log("i am in pattern")
      const value = control.value;
      console.log(value)
        this.fields.find((field) => field.name === fieldName).errorMessage = 'Please respect the valid format.';
     
  }
  else{
  this.fields.find(field => field.name === fieldName).errorMessage = '';}

  }

  checkClient(clientPhone : string,creanceId:number){

      let request=`<?xml version="1.0" encoding="UTF-8"?>\
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/clientservice">\
            <soapenv:Header/>\
            <soapenv:Body>\
                <ser:clientHasCreanceRequest >\
                <phone>${clientPhone}</phone>\
                <creanceId>${creanceId}</creanceId>\
                </ser:clientHasCreanceRequest>\
            </soapenv:Body>\
        </soapenv:Envelope>`;
      
      let headers = {
        SOAPAction: '/apis/createClient',
        'Content-Type': 'text/xml;charset=UTF-8',
      };

      this.http
    .post('/apis/ws', request, {
      headers: headers,
      responseType: 'text',
    })  .subscribe((response) => {
              const parser = new DOMParser();
            const xmlResponse = parser.parseFromString(response, 'text/xml');
            const clientExists = xmlResponse.getElementsByTagName('clientExists')[0].textContent;
            const clientHasCreance = xmlResponse.getElementsByTagName('clientHasCreance')[0].textContent;
            const message = xmlResponse.getElementsByTagName('message')[0].textContent;
            if(clientExists==='false' || clientHasCreance==='false'){
          // this.onClose()
              this.openErrorDialog(message)
            }
            else{
              console.log("i am in the else")
              this.onClose()
              const queryParams = { creanceId: creanceId, clientPhone: clientPhone };
              this.router.navigate(['/impayes'],{queryParams});

            }
    
      }) }


   openErrorDialog(message:string):void {
    console.log("this is the message " +message)
    ErrorPopupComponent.message=message;
    this.dialogErrorRef.open(ErrorPopupComponent, {
    });
    console.log("after opening "+ErrorPopupComponent.message)

  }
}
