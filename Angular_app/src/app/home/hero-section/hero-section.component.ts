import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {

  isNavbarVisible= false;
  
  toggleNavbar() {
    let navbar:any;
    navbar = document.getElementById('navbar');
    navbar.classList.toggle('hidden');
    this.isNavbarVisible=!this.isNavbarVisible;
}
}
