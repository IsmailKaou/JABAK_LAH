import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCrudComponent } from './agent-crud.component';

describe('AgentCrudComponent', () => {
  let component: AgentCrudComponent;
  let fixture: ComponentFixture<AgentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
