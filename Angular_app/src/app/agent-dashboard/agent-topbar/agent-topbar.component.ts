import { Component } from '@angular/core';
import { AgentAuthService } from 'src/app/_components/authAgent.service';

@Component({
  selector: 'app-agent-topbar',
  templateUrl: './agent-topbar.component.html',
  styleUrls: ['./agent-topbar.component.css'],
})
export class AgentTopbarComponent {
  isProfileMenuHidden: boolean = true;
  constructor(private authService: AgentAuthService) {}

  onLogout() {
    this.authService.logout();
  }
  toggleProfileMenu() {
    this.isProfileMenuHidden = !this.isProfileMenuHidden;
  }
}
