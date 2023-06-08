import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTopbarComponent } from './agent-topbar.component';

describe('AgentTopbarComponent', () => {
  let component: AgentTopbarComponent;
  let fixture: ComponentFixture<AgentTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
