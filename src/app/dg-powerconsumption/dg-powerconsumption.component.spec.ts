import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgPowerconsumptionComponent } from './dg-powerconsumption.component';

describe('DgPowerconsumptionComponent', () => {
  let component: DgPowerconsumptionComponent;
  let fixture: ComponentFixture<DgPowerconsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgPowerconsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgPowerconsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
