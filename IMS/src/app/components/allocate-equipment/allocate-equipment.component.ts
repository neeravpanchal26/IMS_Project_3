import { Component, OnInit } from '@angular/core';
import { AllocateEquipmentService, iAllocation, iEquipment } from './allocate-equipment.service';
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { DatePipe } from '../../../../node_modules/@angular/common';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-allocate-equipment',
  templateUrl: './allocate-equipment.component.html',
  styleUrls: ['./allocate-equipment.component.css'],
  providers:[AllocateEquipmentService,DatePipe]
})
export class AllocateEquipmentComponent implements OnInit {

  constructor(private service:AllocateEquipmentService,
              private tService:ToastrNotificationService,
              private date:DatePipe,
              private router:ActivatedRoute,
              private formBuilder:FormBuilder) { }
  public equipment:any;
  public techEmployees:any;
  public userEquipment:any;
  public today:any;
  public filter:null;
  public allocateEquipmentForm:FormGroup;
  public p=null;
  public id:any;
  public equipmentPicture:any;
  ngOnInit()
  {
    this.id=parseInt(this.router.snapshot.paramMap.get('id'));
    let param:iEquipment = {id:this.id};
    this.service.getEquipmentDetails(param).subscribe(data=>console.log(this.equipment=data[0]));
    this.getImage(param);
    this.service.getTechEmployees().subscribe(data=>this.techEmployees=data);
    
    //this.service.getUserEquipment().subscribe(data=>this.userEquipment=data);
    this.buildForm();
  }
  getImage(param)
  {
   this.service.getEquipmentPicture(param)
       .subscribe(
           data=>
           {
             this.equipmentPicture = this.service.sanitizeEquipmentPicture(data);
           console.log(this.equipmentPicture);

           });
  }
  allocateEquipment(e)
  {
    this.today=new Date();
    console.log(this.date.transform(this.today,'yyyy-MM-dd'));
    let uID=e.value['user'];
    let param:iAllocation = {
      condition:this.equipment.EquipmentCondition,
      value:this.equipment.Cost,
      equipmentID:this.id,
      userID:uID
    };
    console.log(param);
    this.service.allocateEquipment(param).subscribe(data => {
      if (data == true) {
        this.tService.allocationSuccess(this.id, uID);
      }
      else{
        console.log("something went wrong.");
      }
    },
      error => this.tService.handleError(error));
  }
  buildForm():void {
      this.allocateEquipmentForm = this.formBuilder.group({
        'name':[''],
        'desc':[''],
        'brand':[''],
        'cost':[''],
        'condition':[''],
        'type':[''],
        'supplier':[''],
        'user':['',Validators.compose([Validators.required])]
    });
}
}