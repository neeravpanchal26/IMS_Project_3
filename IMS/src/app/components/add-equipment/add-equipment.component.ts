import { Component, OnInit, ViewChild } from '@angular/core';
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
  public map:any;

  @ViewChild('cropper',undefined)

  context: Canvas2DContextAttributes;
  @ViewChild("mycanvas") mycanvas;
  preview(e:any): void
  {
    let canvas = this.mycanvas.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(0,0,30,30);

    var render = new FileReader();
    render.onload=function(event:any)
    {
      var img = new Image();
      img.onload = function()
      {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0);
      };
      img.src=event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }


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
    this.location.getLocation().subscribe(data=>this.position=data);

  }
  receiveEquipment(e)
  {
    
    e.preventDefault();
    let param:iAddEquipment=
    {
      name:e.target.elements[0].value,
      desc:e.target.elements[1].value,
      locationGps:e.target.elements[3].value,
      locationPerson:null,
      cost:e.target.elements[4].value,
      equipmentCondition:e.target.elements[5].value,
      brand:e.target.elements[6].value,
      section:e.target.elements[7].value,
      type:e.target.elements[8].value,
      status:e.target.elements[11].value,
      conditionPic:e.target.files[0].value,
      dateReceived:e.target.elements[10].value,
    };
    console.log(param);
    //this.service.AddEquipment(param);
  }
  
}


