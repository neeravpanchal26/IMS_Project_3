import { Component, OnInit } from '@angular/core';
import { InstallEquipmentService } from './install-equipment.service';
import * as L from 'leaflet';
import { GeoLocationService } from "../../globalServices/geolocation.service";
import { LoginService } from '../login/login.service';
import { ToastrNotificationService } from '../../globalServices/toastr-notification.service';
import { QrCodeDecoderService } from '../../globalServices/qr-code-decoder.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-install-equipment',
  templateUrl: './install-equipment.component.html',
  styleUrls: ['./install-equipment.component.css'],
  providers: [InstallEquipmentService]
})
export class InstallEquipmentComponent implements OnInit {

  constructor(private IEService: InstallEquipmentService, private geo: GeoLocationService, private login: LoginService,
    private toastr: ToastrNotificationService, private qrService: QrCodeDecoderService, private fBuilder: FormBuilder) { }
  public lat: any;
  public long: any;
  public coords: any;
  public map: any;
  public equipment: any;
  public marker: any;
  public subscription: Subscription
  public result: any;
  public installEquipmentForm: FormGroup;
  ngOnInit() {

    this.geo.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      console.log(this.lat + '  ' + this.long);
      this.map = L.map('mapid').setView([this.lat, this.long], 14);
      this.loadMap(this.map, this.lat, this.long);
    }, error => {
      if (error == "You have rejected access to your location") {
        this.toastr.geolocationTurnedOff();
      }
      else if (error == "Unable to determine your location") {
        this.toastr.geolocationUnavailablePosition();
      }
      else if (error == "Service timeout has been reached") {
        this.toastr.geolocationSeviceTimeOut();
      }
      else {
        this.toastr.geolocationBrowserNotSupportive();
      }
    });
    this.buildForm();
    this.IEService.getInstallEquipment(this.login.getUserID()).subscribe(data => { this.equipment = data });
  }
  installEquipment(e)
  {
    console.log(e);
  }
  loadMap(mymap, lat, long) {
    this.lat = lat;
    this.long = long;
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWxhbmdldmVsZDE1IiwiYSI6ImNqa2R1a3A5aTFpeXkza252cDlkbDQ2MXIifQ.uTJ2w8n_rjeHtl1usY3K9Q'
      }).addTo(mymap);
    this.marker = L.marker([lat, long], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../assets/marker-icon.png',
        shadowUrl: '../assets/marker-shadow.png'
      }), draggable: true
    }).openTooltip().addTo(mymap);
    console.log(this.marker._latlng)
    this.markerChange(this.marker);
  }
  markerChange(marker: any) {
    marker.on('dragend', function (e: any) {
      let marker = e.target;
      let location = marker.getLatLng();
      this.lat = location.lat;
      this.lng = location.lng;
      console.log("Latitude: " + this.lat);
      console.log("Longitude: " + this.lng);
    })
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrService.decode(file)
      .subscribe(decodedString => {this.installEquipmentForm.controls['serial'].setValue(decodedString);});
      
  }

  buildForm(): void {
    this.installEquipmentForm = this.fBuilder.group({
      'serial': ['', Validators.compose([Validators.required])],
      'desc': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
    });
  }
}


