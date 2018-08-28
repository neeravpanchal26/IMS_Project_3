import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectEquipmentComponent } from './inspect-equipment.component';

describe('InspectEquipmentComponent', () => {
  let component: InspectEquipmentComponent;
  let fixture: ComponentFixture<InspectEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
