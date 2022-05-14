import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgStatusHistoryComponent } from './dg-status-history.component';

describe('DgStatusHistoryComponent', () => {
  let component: DgStatusHistoryComponent;
  let fixture: ComponentFixture<DgStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgStatusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
