import { Component, OnInit } from '@angular/core';
import { ManageEquipmentService } from './manage-equipment.service';

@Component({
  selector: 'app-manage-equipment',
  templateUrl: './manage-equipment.component.html',
  styleUrls: ['./manage-equipment.component.css'],
  providers: [ManageEquipmentService]
  
})
export class ManageEquipmentComponent implements OnInit {
public info:any;



  constructor(private service:ManageEquipmentService) { }
  public filter:null;
  ngOnInit() {
    this.service.GetEquipmentInfo().subscribe(data=>this.info=data);
  }

}
