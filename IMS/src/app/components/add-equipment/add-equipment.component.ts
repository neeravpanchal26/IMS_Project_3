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
  public brands:any;
  public status:any;
  public position:any;
  public coords:any;
  public users:any;
  public types:any;
  public conditions:any;
  public sections:any;
constructor(private service:AddEquipmentService, private location:GeoLocationService)
{}
  
  ngOnInit()
  { 
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
    this.service.GetUsers().subscribe(data=>this.users=data);
    this.service.GetTypes().subscribe(data=>this.types=data)
    this.service.GetConditions().subscribe(data=>this.conditions=data);
    this.service.GetSections().subscribe(data=>this.sections=data);
  }
  getLocation()
  {
    this.location.getLocation().subscribe(data=>this.position=data)
  }
  receiveEquipment(e)
  {
    
    e.preventDefault();
    let param:iAddEquipment=
    {
      equipmentID:e.target.elements[0].value,
      name:e.target.elements[1].value,
      desc:e.target.elements[2].value,
      locationGps:e.target.elements[4].value,
      locationPerson:null,
      cost:e.target.elements[5].value,
      equipmentCondition:e.target.elements[6].value,
      brand:e.target.elements[7].value,
      section:e.target.elements[8].value,
      type:e.target.elements[9].value,
      status:e.target.elements[10].value,
      conditionPic:e.target.elements[11].value,
      dateReceived:e.target.elements[12].value,
    };
    console.log(param);
    //this.service.AddEquipment(param);
  }
  readUrl(input)
  {
    if(input.files && input.files[0])
    {
      var reader = new FileReader();
      reader.onload = function(e)
      {
        //image('#imageID').attr('src', e.target.result).width(150).height(200);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
}


