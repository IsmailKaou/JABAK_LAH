import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAboutUsHomeComponent } from './contact-us-about-us-home.component';

describe('ContactUsAboutUsHomeComponent', () => {
  let component: ContactUsAboutUsHomeComponent;
  let fixture: ComponentFixture<ContactUsAboutUsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsAboutUsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsAboutUsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
