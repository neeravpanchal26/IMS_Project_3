import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalReportsComponent } from './technical-reports.component';

describe('TechnicalReportsComponent', () => {
  let component: TechnicalReportsComponent;
  let fixture: ComponentFixture<TechnicalReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
