import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllotmentComponent } from './work-allotment.component';

describe('WorkAllotmentComponent', () => {
  let component: WorkAllotmentComponent;
  let fixture: ComponentFixture<WorkAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
