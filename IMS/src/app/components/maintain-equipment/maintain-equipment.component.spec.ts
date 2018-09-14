import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainEquipmentComponent } from './maintain-equipment.component';

describe('MaintainEquipmentComponent', () => {
  let component: MaintainEquipmentComponent;
  let fixture: ComponentFixture<MaintainEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
