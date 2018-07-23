import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEquipmentService, iAddEquipment } from './add-equipment.service';
import { GeoLocationService } from './geolocation.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { handleError } from '../error/error';

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


constructor(private service:AddEquipmentService, private location:GeoLocationService, private toastr:ToastrService)
{}
  
  ngOnInit()
  { 
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
    this.service.GetConditions().subscribe(data=>this.conditions=data);
    this.service.GetSections().subscribe(data=>this.sections=data);
  }
  getLocation()
  {
    this.location.getLocation().subscribe(data=>this.position=data);

  }
  addEquipment(e)
  {
    
    e.preventDefault();
    let param:iAddEquipment=
    {
      name:e.target.elements[0].value,
      desc:e.target.elements[1].value,
      cost:e.target.elements[2].value,
      equipmentCondition:e.target.elements[3].value,
      brand:e.target.elements[4].value,
      section:e.target.elements[5].value,
      status:e.target.elements[6].value,
      dateReceived:e.target.elements[7].value
    };
    console.log(param);
    let result:any;
    this.service.AddEquipment(param).subscribe(data=>result=data,
      error => this.toastr.error(handleError(error),'Oops!'));
  }
  
}


