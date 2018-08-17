import { Component, OnInit } from '@angular/core';
import { ManageEquipmentService } from './manage-equipment.service';

@Component({
  selector: 'app-manage-equipment',
  templateUrl: './manage-equipment.component.html',
  styleUrls: ['./manage-equipment.component.css'],
  providers: [ManageEquipmentService]
  
})
export class ManageEquipmentComponent implements OnInit {
  // Global Variables
  public info:any;
  public filter:null;

  constructor(private service:ManageEquipmentService) { }

  ngOnInit() {
    this.service.GetEquipmentInfo().subscribe(data=>this.info=data);
  }

}
