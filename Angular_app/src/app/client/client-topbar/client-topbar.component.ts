import { Component } from '@angular/core';
import { AuthService } from 'src/app/_components/auth.service';

@Component({
  selector: 'app-client-topbar',
  templateUrl: './client-topbar.component.html',
  styleUrls: ['./client-topbar.component.css'],
})
export class ClientTopbarComponent {
  isProfileMenuHidden: boolean = true;

  constructor(private authService: AuthService) {}
  toggleProfileMenu() {
    this.isProfileMenuHidden = !this.isProfileMenuHidden;
  }
  onLogout() {
    this.authService.logout();
  }
}
