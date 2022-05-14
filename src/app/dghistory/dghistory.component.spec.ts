import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DghistoryComponent } from './dghistory.component';

describe('DghistoryComponent', () => {
  let component: DghistoryComponent;
  let fixture: ComponentFixture<DghistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DghistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
