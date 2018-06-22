import { Component, OnInit } from '@angular/core';
import { AddEquipmentService } from './add-equipment.service';
import { GeoLocationService } from './geolocation.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
  providers:[AddEquipmentService, GeoLocationService]
})
export class AddEquipmentComponent implements OnInit {


  constructor(private service:AddEquipmentService, private location:GeoLocationService) { }
  public brands:any;
  public status:any;
public position:any;
public coords:any;
public remoteClicked=true;
public fixedClicked=true;
public getLocButton=true;
  ngOnInit()
  { let e:any;
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
  }
  getLocation()
  {
    this.location.getLocation().subscribe(values=>{this.position=values});
  }
  
}

