import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaulthistoryComponent } from './faulthistory.component';

describe('FaulthistoryComponent', () => {
  let component: FaulthistoryComponent;
  let fixture: ComponentFixture<FaulthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaulthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaulthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
