import { Component, OnInit } from '@angular/core';
import { InstallEquipmentService, iInstallEquipment } from './install-equipment.service';
import * as L from 'leaflet';
import { GeoLocationService } from "../../globalServices/geolocation.service";
import { LoginService } from '../login/login.service';
import { ToastrNotificationService } from '../../globalServices/toastr-notification.service';
import { QrCodeDecoderService } from '../../globalServices/qr-code-decoder.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { longStackSupport } from 'q';

@Component({
    selector: 'app-install-equipment',
    templateUrl: './install-equipment.component.html',
    styleUrls: ['./install-equipment.component.css'],
    providers: [InstallEquipmentService]
})
export class InstallEquipmentComponent implements OnInit {

    constructor(private IEService: InstallEquipmentService, private geo: GeoLocationService, private login: LoginService,
        private toastr: ToastrNotificationService, private qrService: QrCodeDecoderService, private fBuilder: FormBuilder) {
    }

    public lat: any;
    public long: any;
    public map: any;
    public equipment: any;
    public marker: any;
    public subscription: Subscription
    public installEquipmentForm: FormGroup;
    public apiUrl = environment.api;
    public active: any;
    public concatcoords: any;
    public markerLat:any;
    public markerLong:any
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
        this.IEService.getInstallEquipment(this.login.getUserID()).subscribe(data => {
            this.equipment = data
        });
    }

    installEquipment(e) {
        if (e.value['status'] == '1') {
            this.active = true;
        }
        else {
            this.active = false;
        }
        let param: iInstallEquipment =
        {
            serial: e.value['serial'],
            coords: e.value['coords'],
            userID: this.login.getUserID(),
            act: this.active,
            desc: e.value['desc']

        }
        console.log(param);
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
                iconUrl: this.apiUrl + '/api/globalImages/marker-icon.png',
                shadowUrl: this.apiUrl + '/api/globalImages/marker-shadow.png'
            }), draggable: true
        }).openTooltip().addTo(mymap);
        console.log(this.marker._latlng);
        this.markerChange(this.marker);
    }

    markerChange(marker: any) {
        marker.on('dragend', function (e: any) {
            let marker = e.target;
            let location = marker.getLatLng();
            this.lat = location.lat;
            this.long = location.lng;
            console.log("Marker Coords: " + this.Lat+", "+this.Long);
            
        });
        this.installEquipmentForm.controls['coords'].setValue(this.markerLat + ', ' + this.markerLong);
    }

    onFileChange(event) {
        const file = event.target.files[0];
        this.subscription = this.qrService.decode(file)
            .subscribe(decodedString => {
                if (decodedString == 'error decoding QR Code')
                    this.toastr.qrCodeScanError();
                else
                    this.installEquipmentForm.controls['serial'].setValue(decodedString);
            });

    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    buildForm(): void {
        this.installEquipmentForm = this.fBuilder.group({
            'serial': ['', Validators.compose([Validators.required])],
            'desc': ['', Validators.compose([Validators.required])],
            'status': ['', Validators.compose([Validators.required])],
            'coords': ['']
        });
    }
}


