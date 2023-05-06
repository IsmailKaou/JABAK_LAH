import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.css']
})
export class AdminTopbarComponent {

  isProfileMenuHidden: boolean = true;

  toggleProfileMenu() {
    this.isProfileMenuHidden = !this.isProfileMenuHidden;
  }
}
