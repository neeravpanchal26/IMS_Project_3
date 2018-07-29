import { Component, OnInit } from '@angular/core';
import { AllocateEquipmentService, iAllocation } from './allocate-equipment.service';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../../globalAssets/global.service';

@Component({
  selector: 'app-allocate-equipment',
  templateUrl: './allocate-equipment.component.html',
  styleUrls: ['./allocate-equipment.component.css'],
  providers:[AllocateEquipmentService]
})
export class AllocateEquipmentComponent implements OnInit {

  constructor(private service:AllocateEquipmentService, private gService:GlobalService) { }
  public equipment:any;
  public techEmployees:any;
  public userEquipment:any;
  ngOnInit()
  {
    
    this.service.getUnnassignedEquipment().subscribe(data=>this.equipment=data);
    this.service.getTechEmployees().subscribe(data=>this.techEmployees=data);
    
    //this.service.getUserEquipment().subscribe(data=>this.userEquipment=data);
  }
  allocateEquipment(e,condi,val,equip)
  {
    e.preventDefault();
    let date = new Date();
    let today = date.getFullYear() +'-'+date.getMonth()+ '-'+date.getDate();
    console.log(today);
    let uID=e.target.value;
    let param:iAllocation = {date:today,condition:condi,value:val,equipmentID:equip,userID:uID};
    console.log(param);
    var result:any;
    this.service.allocateEquipment(param).subscribe(data => {
      if (data == true) {
        this.gService.allocationSuccess(equip, uID);
        location.reload();
      }
      else{
        console.log("something went wrong. debug this shit");
      }
    },
      error => this.gService.handleError(error));
  }
}