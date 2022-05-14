import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionNewComponent } from './consumption-new.component';

describe('ConsumptionNewComponent', () => {
  let component: ConsumptionNewComponent;
  let fixture: ComponentFixture<ConsumptionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
