import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './_components/login-form/login-form.component';
import { ClientComponent } from './client/client/client.component';
import { AgentComponent } from './agent/agent/agent.component';
import { AgentHomeComponent } from './home/agent-home/agent-home.component';
import { ClientHomeComponent } from './home/client-home/client-home.component';
import { ContactUsAboutUsHomeComponent } from './home/contact-us-about-us-home/contact-us-about-us-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatTabsModule } from '@angular/material/tabs';
import { CreditorsComponent } from './client/creditors/creditors.component';
import {MatSelectModule} from '@angular/material/select'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { PaymentsComponent } from './client/creditors/payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    ClientComponent,
    AgentComponent,
    AgentHomeComponent,
    ClientHomeComponent,
    ContactUsAboutUsHomeComponent,
    CreditorsComponent,
    PaymentsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatTableModule
         
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
