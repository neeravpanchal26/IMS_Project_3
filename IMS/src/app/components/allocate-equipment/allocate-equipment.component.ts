import { Component, OnInit } from '@angular/core';
import { AllocateEquipmentService, iAllocation, iEquipment } from './allocate-equipment.service';
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { DatePipe } from '../../../../node_modules/@angular/common';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-allocate-equipment',
  templateUrl: './allocate-equipment.component.html',
  styleUrls: ['./allocate-equipment.component.css'],
  providers:[AllocateEquipmentService,DatePipe]
})
export class AllocateEquipmentComponent implements OnInit {

  constructor(private service:AllocateEquipmentService, private tService:ToastrNotificationService,private date:DatePipe,private router:ActivatedRoute) { }
  public equipment:any;
  public techEmployees:any;
  public userEquipment:any;
  public today:any;
  public filter:null;
  public p=null;
  public id:any;
  public getImage:any;
  ngOnInit()
  {
    this.id=parseInt(this.router.snapshot.paramMap.get('id'));
    let param:iEquipment = {id:this.id};
    this.service.getUnnassignedEquipment(param).subscribe(data=>console.log(this.equipment=data[0]));
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
        this.tService.allocationSuccess(equip, uID);
        location.reload();
      }
      else{
        console.log("something went wrong.");
      }
    },
      error => this.tService.handleError(error));
  }
}