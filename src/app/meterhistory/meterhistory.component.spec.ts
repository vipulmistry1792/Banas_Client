import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterhistoryComponent } from './meterhistory.component';

describe('MeterhistoryComponent', () => {
  let component: MeterhistoryComponent;
  let fixture: ComponentFixture<MeterhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
