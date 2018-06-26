import { Component, OnInit } from '@angular/core';
import { AllocateEquipmentService } from './allocate-equipment.service';

@Component({
  selector: 'app-allocate-equipment',
  templateUrl: './allocate-equipment.component.html',
  styleUrls: ['./allocate-equipment.component.css'],
  providers:[AllocateEquipmentService]
})
export class AllocateEquipmentComponent implements OnInit {

  constructor(private service:AllocateEquipmentService) { }
  public techEmployees:any;
  public equipment:any;
  ngOnInit()
  {
    this.service.getTechEmployees().subscribe(data => this.techEmployees=data);
    this.service.getEquipment().subscribe(data=>this.equipment=data);
  }
  equipmentSelect(e)
  {

  }
  allocateEquipment()
  {
    
  }

}
