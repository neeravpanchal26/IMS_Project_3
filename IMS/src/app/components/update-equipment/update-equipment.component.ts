import { Component, OnInit } from '@angular/core';
import { UpdateEquipmentService } from './update-equipment.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css'],
  providers:[UpdateEquipmentService]
})
export class UpdateEquipmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
