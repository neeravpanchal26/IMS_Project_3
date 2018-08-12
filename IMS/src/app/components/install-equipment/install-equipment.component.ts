import { Component, OnInit} from '@angular/core';
import { InstallEquipmentService } from './install-equipment.service';
import {tileLayer,latLng} from 'leaflet';
@Component({
  selector: 'app-install-equipment',
  templateUrl: './install-equipment.component.html',
  styleUrls: ['./install-equipment.component.css'],
  providers: [InstallEquipmentService]
})
export class InstallEquipmentComponent implements OnInit {



  constructor(private IEService: InstallEquipmentService) { }
  public lat: any;
  public long: any;
  public coords: any;

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
  
  ngOnInit() {
    this.IEService.getCoords().subscribe(data => {
      let tosplit = data[0].LocationGPS;

      let split = tosplit.split(", ", 2);
      console.log(this.lat = split[0]);
      console.log(this.long = split[1]);
    });
  };
  
    
  }


