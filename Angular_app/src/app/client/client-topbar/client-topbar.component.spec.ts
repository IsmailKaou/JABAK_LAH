import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTopbarComponent } from './client-topbar.component';

describe('ClientTopbarComponent', () => {
  let component: ClientTopbarComponent;
  let fixture: ComponentFixture<ClientTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
