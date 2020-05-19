import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEntryComponent } from './staff-entry.component';

describe('StaffEntryComponent', () => {
  let component: StaffEntryComponent;
  let fixture: ComponentFixture<StaffEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
