import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionReportsComponent } from './section-reports.component';

describe('SectionReportsComponent', () => {
  let component: SectionReportsComponent;
  let fixture: ComponentFixture<SectionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
