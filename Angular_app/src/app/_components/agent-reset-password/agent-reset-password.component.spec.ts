import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentResetPasswordComponent } from './agent-reset-password.component';

describe('AgentResetPasswordComponent', () => {
  let component: AgentResetPasswordComponent;
  let fixture: ComponentFixture<AgentResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
