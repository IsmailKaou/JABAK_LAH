import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarVisible = false;
  isNavbarFixed: boolean = false;
  toggleNavbar() {
    let navbar: any;
    navbar = document.getElementById('navbar');
    navbar.classList.toggle('hidden');
    this.isNavbarVisible = !this.isNavbarVisible;
  }
  toHome() {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  }
  toClient() {
    document.getElementById('client')?.scrollIntoView({ behavior: 'smooth' });
  }
  toAgent() {
    document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' });
  }
  toAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
  toContact() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }
}
