import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerQuilityComponent } from './power-quility.component';

describe('PowerQuilityComponent', () => {
  let component: PowerQuilityComponent;
  let fixture: ComponentFixture<PowerQuilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerQuilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerQuilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
