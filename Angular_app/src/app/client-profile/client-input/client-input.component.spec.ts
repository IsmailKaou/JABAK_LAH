import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInputComponent } from './client-input.component';

describe('AgentInputComponent', () => {
  let component: ClientInputComponent;
  let fixture: ComponentFixture<ClientInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
