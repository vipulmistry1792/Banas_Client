import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConsComponent } from './energy-cons.component';

describe('EnergyConsComponent', () => {
  let component: EnergyConsComponent;
  let fixture: ComponentFixture<EnergyConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyConsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
