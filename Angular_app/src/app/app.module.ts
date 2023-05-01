import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { AgentInputComponent } from './agent-profile/agent-input/agent-input.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientInputComponent } from './client-profile/client-input/client-input.component';

import { MatTabsModule } from '@angular/material/tabs';
import { CreditorsComponent } from './client/creditors/creditors.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { PaymentsComponent } from './client/creditors/payments/payments.component';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { EmailService } from './home/email.service';
import { HeroSectionComponent } from './home/hero-section/hero-section.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ElementsComponent } from './client/creditors/elements/elements.component';
import { ElementsPipe } from './client/client/creditors/elements.pipe';
import { FilterByCategorie } from './client/creditors/elements/FilterByCategorie';

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
    AgentProfileComponent,
    AgentInputComponent,
    ClientProfileComponent,
    ClientInputComponent,
    CreditorsComponent,
    PaymentsComponent,
    HeroSectionComponent,
    NavbarComponent,
    ElementsComponent,
    ElementsPipe,
    FilterByCategorie,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [EmailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
