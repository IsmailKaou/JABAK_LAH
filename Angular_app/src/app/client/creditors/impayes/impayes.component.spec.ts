import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpayesComponent } from './impayes.component';

describe('ImpayesComponent', () => {
  let component: ImpayesComponent;
  let fixture: ComponentFixture<ImpayesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpayesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpayesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
