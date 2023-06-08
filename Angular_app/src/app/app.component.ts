import { Component, OnInit } from '@angular/core';
import { AuthService } from './_components/auth.service';
import { AgentAuthService } from './_components/authAgent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private authAgent: AgentAuthService
  ) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    this.authAgent.autoLogin();
  }
  title = 'Angular_app';
}
