import { Component } from '@angular/core';
import { AgentAuthService } from 'src/app/_components/authAgent.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-agent-topbar',
  templateUrl: './agent-topbar.component.html',
  styleUrls: ['./agent-topbar.component.css'],
})
export class AgentTopbarComponent {
  isProfileMenuHidden: boolean = true;
  constructor(
    private authService: AgentAuthService,
    private sharedService: SharedServiceService
  ) {}

  searchValue: string;

  handleSearch() {
    this.sharedService.setSearchValue(this.searchValue);
  }
  onLogout() {
    this.authService.logout();
  }
  toggleProfileMenu() {
    this.isProfileMenuHidden = !this.isProfileMenuHidden;
  }
  updateSearchValue(): void {
    this.sharedService.setSearchValue(this.searchValue);
  }
}
