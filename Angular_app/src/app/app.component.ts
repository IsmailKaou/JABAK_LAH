import { Component, OnInit } from '@angular/core';
import { AuthService } from './_components/auth.service';
import { AgentAuthService } from './_components/authAgent.service';
import { AuthAdminService } from './_components/auth-admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private authAgent: AgentAuthService,
    private authAdmin: AuthAdminService
  ) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.authAgent.autoLogin();
    this.authAdmin.autoLogin();
  }
  title = 'Angular_app';
}
