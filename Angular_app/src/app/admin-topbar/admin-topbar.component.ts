import { Component } from '@angular/core';
import { AuthAdminService } from '../_components/auth-admin.service';
import { SharedServiceService } from '../agent-dashboard/shared-service.service';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.css'],
})
export class AdminTopbarComponent {
  isProfileMenuHidden: boolean = true;
  constructor(
    private adminAuthService: AuthAdminService,
    private sharedService: SharedServiceService
  ) {}
  searchValue: string;

  handleSearch() {
    this.sharedService.setSearchValue(this.searchValue);
  }

  toggleProfileMenu() {
    this.isProfileMenuHidden = !this.isProfileMenuHidden;
  }
  onLogout() {
    this.adminAuthService.logout();
  }
}
