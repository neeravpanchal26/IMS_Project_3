import { Component, OnInit } from '@angular/core';
import { AllocateEquipmentService, iAllocation } from './allocate-equipment.service';
import { GlobalService } from '../../globalAssets/global.service';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-allocate-equipment',
  templateUrl: './allocate-equipment.component.html',
  styleUrls: ['./allocate-equipment.component.css'],
  providers:[AllocateEquipmentService,DatePipe]
})
export class AllocateEquipmentComponent implements OnInit {

  constructor(private service:AllocateEquipmentService, private gService:GlobalService,private date:DatePipe) { }
  public equipment:any;
  public techEmployees:any;
  public userEquipment:any;
  public today:any;
  public filter:null;
  public p=null;
  ngOnInit()
  {
    
    this.service.getUnnassignedEquipment().subscribe(data=>this.equipment=data);
    this.service.getTechEmployees().subscribe(data=>this.techEmployees=data);
    
    //this.service.getUserEquipment().subscribe(data=>this.userEquipment=data);
  }
  allocateEquipment(e,condi,val,equip)
  {
    e.preventDefault();
    this.today=new Date();
    console.log(this.date.transform(this.today,'yyyy-MM-dd'));
    let uID=e.target.value;
    let param:iAllocation = {
      condition:condi,
      value:val,
      equipmentID:equip,
      userID:uID
    };
    console.log(param);
    this.service.allocateEquipment(param).subscribe(data => {
      if (data == true) {
        this.gService.allocationSuccess(equip, uID);
        location.reload();
      }
      else{
        console.log("something went wrong.");
      }
    },
      error => this.gService.handleError(error));
  }
}