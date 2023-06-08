import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChartComponent } from './agent-chart.component';

describe('AgentChartComponent', () => {
  let component: AgentChartComponent;
  let fixture: ComponentFixture<AgentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
