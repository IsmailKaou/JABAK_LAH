import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent {
  toContact() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
