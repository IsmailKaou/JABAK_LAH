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
// import { ElementsPipe } from './client/client/creditors/elements.pipe';
import { FilterByCategorie } from './client/creditors/elements/FilterByCategorie';

import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AdminCrudComponent } from './admin-dashboard/admin-crud/admin-crud.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AgentCrudComponent } from './agent-dashboard/agent-crud/agent-crud.component';
import { AgentTopbarComponent } from './agent-dashboard/agent-topbar/agent-topbar.component';
import { AgentStatisticsComponent } from './agent-dashboard/agent-statistics/agent-statistics.component';
import { AgentChartComponent } from './agent-dashboard/agent-chart/agent-chart.component';
import { AgentFormComponent } from './admin-dashboard/agent-form/agent-form.component';
import { ClientFormComponent } from './agent-dashboard/client-form/client-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { ClientTopbarComponent } from './client/client-topbar/client-topbar.component';
import { AuthGuard } from './_components/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientLogin', component: ClientComponent },
  { path: 'agentLogin', component: AgentComponent },
  {
    path: 'clientHome',
    component: CreditorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: HomeComponent },
];

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
    FilterByCategorie,
    AdminCrudComponent,
    AdminDashboardComponent,
    AdminTopbarComponent,
    AgentDashboardComponent,
    AgentCrudComponent,
    AgentTopbarComponent,
    AgentStatisticsComponent,
    AgentChartComponent,
    AgentFormComponent,
    ClientFormComponent,
    ResetPasswordComponent,
    ClientTopbarComponent,
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
    MatDialogModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EmailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
