import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAlotReportComponent } from './work-alot-report.component';

describe('WorkAlotReportComponent', () => {
  let component: WorkAlotReportComponent;
  let fixture: ComponentFixture<WorkAlotReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAlotReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAlotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
