import { Component, OnInit } from '@angular/core';
import { AddEquipmentService, iAddEquipment } from './add-equipment.service';
import { GeoLocationService } from './geolocation.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
  providers:[AddEquipmentService, GeoLocationService]
})
export class AddEquipmentComponent implements OnInit {

constructor(private service:AddEquipmentService, private location:GeoLocationService)
{}
  public brands:any;
  public status:any;
  public position:any;
  public coords:any;
  public users:any;
  public types:any;
  public remoteClicked=true;
  public fixedClicked=true;
  public getLocButton=true;
  ngOnInit()
  { 
    let e:any;
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
    this.service.GetUsers().subscribe(data=>this.users=data);
    this.service.GetTypes().subscribe(data=>this.types=data)
  }
  getLocation()
  {
    this.location.getLocation().subscribe(data=>this.position=data)
  }
  receiveEquipment(e)
  {
    let param:iAddEquipment=
    {
      equipmentID:e.target.elements[0].value,
      name:e.target.elements[1].value,
      desc:e.target.elements[2].value,
      locationGps:e.target.elements[3].value,
      locationPerson:e.target.elements[4].value,
      cost:e.target.elements[5].value,
      equipmentCondition:e.target.elements[6].value,
      brand:e.target.elements[7].value,
      section:e.target.elements[8].value,
      type:e.target.elements[9].value,
      status:e.target.elements[10].value,
      conditionPic:e.target.elements[11].value,
      dateReceived:e.target.elements[12].value,
    }
    console.log(param);
    this.service.AddEquipment(param);
  }
  
}

