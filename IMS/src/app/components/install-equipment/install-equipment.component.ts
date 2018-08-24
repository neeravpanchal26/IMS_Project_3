import { Component, OnInit } from '@angular/core';
import { InstallEquipmentService } from './install-equipment.service';
import * as L from 'leaflet';
import { GeoLocationService } from "../../globalServices/geolocation.service";
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-install-equipment',
  templateUrl: './install-equipment.component.html',
  styleUrls: ['./install-equipment.component.css'],
  providers: [InstallEquipmentService]
})
export class InstallEquipmentComponent implements OnInit {



  constructor(private IEService: InstallEquipmentService, private geo: GeoLocationService, private login: LoginService) { }
  public lat: any;
  public long: any;
  public coords: any;
  public map: any;
  public equipment: any;
  ngOnInit() {

    this.geo.getLocation().subscribe(data => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      console.log(this.lat + '  ' + this.long);
      this.map = L.map('mapid').setView([this.lat, this.long], 14);
      this.IEService.loadMap(this.map, this.lat, this.long);
    });
    


    this.IEService.getInstallEquipment(this.login.getUserID()).subscribe(data => { this.equipment = data });
  }
}


