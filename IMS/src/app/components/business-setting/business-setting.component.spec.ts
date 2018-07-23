import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSettingComponent } from './business-setting.component';

describe('BusinessSettingComponent', () => {
  let component: BusinessSettingComponent;
  let fixture: ComponentFixture<BusinessSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
