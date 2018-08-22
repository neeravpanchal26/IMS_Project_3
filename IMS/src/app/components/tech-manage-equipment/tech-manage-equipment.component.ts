import { Component, OnInit } from '@angular/core';
import { TechManageEquipmentService, iUserID } from './tech-manage-equipment.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-tech-manage-equipment',
  templateUrl: './tech-manage-equipment.component.html',
  styleUrls: ['./tech-manage-equipment.component.css'],
  providers:[TechManageEquipmentService,LoginService]
})
export class TechManageEquipmentComponent implements OnInit {

  constructor(private tService:TechManageEquipmentService,private lService:LoginService) { }
public userID:any;
public info:any;
  ngOnInit() {
    this.userID=this.lService.getUserID();
    console.log(this.userID);
    let param:iUserID = {id:4}
    this.tService.getInfo(param).subscribe(data=>console.log(this.info=data));
  }

}
