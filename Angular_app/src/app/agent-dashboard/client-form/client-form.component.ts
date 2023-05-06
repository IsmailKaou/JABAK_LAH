import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ClientFormComponent>) { }

  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     message: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     // do something with the form data
  //     console.log(this.form.value);

  //     // close the dialog and pass data back to the parent component
  //     this.dialogRef.close(this.form.value);
  //   }
  // }

  onCancel() {
    // close the dialog without passing any data
    this.dialogRef.close();
  }

}
