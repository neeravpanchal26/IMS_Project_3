import { Component, OnInit } from '@angular/core';
import { AddEquipmentService } from './add-equipment.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
  providers:[AddEquipmentService]
})
export class AddEquipmentComponent implements OnInit {

  public status:any;
  public brands:any;
  public latitude:any;
  public longitude:any;
  public setPosition:any;
  public Coordinates:any;
  constructor(private service:AddEquipmentService) { }
  
  ngOnInit()
  {
    this.service.getStatus().subscribe(data=>this.status=data);
    this.service.getBrands().subscribe(data=>this.brands=data);
    
  }
}
