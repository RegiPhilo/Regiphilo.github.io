import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemunerationComponent } from './remuneration.component';

describe('RemunerationComponent', () => {
  let component: RemunerationComponent;
  let fixture: ComponentFixture<RemunerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemunerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemunerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
