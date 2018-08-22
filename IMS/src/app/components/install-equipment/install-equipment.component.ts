import { Component, OnInit} from '@angular/core';
import { InstallEquipmentService } from './install-equipment.service';
import * as L from 'leaflet';
import { GeoLocationService} from "../../globalServices/geolocation.service";

@Component({
  selector: 'app-install-equipment',
  templateUrl: './install-equipment.component.html',
  styleUrls: ['./install-equipment.component.css'],
  providers: [InstallEquipmentService]
})
export class InstallEquipmentComponent implements OnInit {



  constructor(private IEService: InstallEquipmentService, private geo:GeoLocationService) { }
  public lat: any;
  public long: any;
  public coords: any;
  public map:any;

  ngOnInit() {this.IEService.getCoords().subscribe(data => {
    let tosplit = data[0].LocationGPS;
    let split = tosplit.split(", ", 2);
    console.log(this.lat = -33.960556);
    console.log(this.long = 25.606811);
    this.map= L.map('mapid').setView([this.lat, this.long], 14);
    this.IEService.newCoords(this.map,this.lat,this.long);
  });
  };
  alt(e:any)
  {
    this.geo.getLocation().subscribe(data=>
      {
        this.lat=data.coords.latitude;
        this.long=data.coords.longitude;

      });
    this.IEService.newCoords(this.map,this.lat,this.long);
  }
}


