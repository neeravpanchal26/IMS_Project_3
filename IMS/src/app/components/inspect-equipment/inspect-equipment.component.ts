import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {LoginService} from "../login/login.service";
import {InspectEquipmentService} from "./inspect-equipment.service";
import {QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";
import {Subscription} from "rxjs";
import * as L from "leaflet";
import {GeoLocationService} from "../../globalServices/geolocation.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-inspect-equipment',
    templateUrl: './inspect-equipment.component.html',
    styleUrls: ['./inspect-equipment.component.css'],
    providers: [InspectEquipmentService]
})
export class InspectEquipmentComponent implements OnInit {
    // Global Variables
    public inspectEquipmentForm: FormGroup;
    public equipment;
    public condition;
    public equipmentInfo;
    public subscription:Subscription;
    public map:any;
    public marker:any;
    public lat;
    public long;
    public apiUrl = environment.api;

    // Default Constructor
    constructor(private formBuilder: FormBuilder,
                private tService: ToastrNotificationService,
                private lService: LoginService,
                private service: InspectEquipmentService,
                private qrService:QrCodeDecoderService,
                private geo:GeoLocationService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();

        // Get Equipment to inspect
        this.service.getEquipmentToInspect(this.lService.getUserID())
            .subscribe(data => this.equipment = data,
                error => this.tService.handleError(error));

        // Get Condition
        this.service.getCondition()
            .subscribe(data=> this.condition = data,
                error => this.tService.handleError(error));

        // Load up map
        this.geo.getLocation().subscribe(data => {
            this.lat = data.coords.latitude;
            this.long = data.coords.longitude;
            this.map = L.map('mapid').setView([this.lat, this.long], 14);
            this.loadMap(this.map, this.lat, this.long);
        }, error => {
            if (error == "You have rejected access to your location") {
                this.tService.geolocationTurnedOff();
            }
            else if (error == "Unable to determine your location") {
                this.tService.geolocationUnavailablePosition();
            }
            else if (error == "Service timeout has been reached") {
                this.tService.geolocationSeviceTimeOut();
            }
            else {
                this.tService.geolocationBrowserNotSupportive();
            }
        });
    }

    // Individual Equipment Load
    individualEquipmentLoad(e) {
        this.service.getEquipmentInfoBySerial(e)
            .subscribe(
                data=>
                {
                    this.equipmentInfo = data[0];
                    this.inspectEquipmentForm.controls['equipmentCondition'].setValue(this.equipmentInfo.Condition);
                    this.inspectEquipmentForm.controls['equipmentValue'].setValue(this.equipmentInfo.Value);
                    this.inspectEquipmentForm.controls['description'].setValue(this.equipmentInfo.Desc);
                },
                error=> this.tService.handleError(error));
    }

    // Inspect Equipment
    inspectEquipment(e) {
        if (e.valid) {

        }
        else if (e.invalid)
            this.tService.formFailure();
    }

    // Qr Scanner fn
    onFileChange(event) {
        const file = event.target.files[0];
        this.subscription = this.qrService.decode(file)
            .subscribe(decodedString => {
                if (decodedString == 'error decoding QR Code')
                    this.tService.qrCodeScanError();
                else {
                    this.inspectEquipmentForm.controls['equipmentSerial'].setValue(decodedString);
                    this.individualEquipmentLoad(this.inspectEquipmentForm.controls['equipmentSerial'].value);
                }
            });

    }

    // Map functions
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
                iconUrl: this.apiUrl + '/api/Assets/marker-icon.png',
                shadowUrl: this.apiUrl + '/api/Assets/marker-shadow.png'
            }), draggable: false
        }).openTooltip().addTo(mymap);
    }

    // Selection setter
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    // Form Builder
    buildForm(): void {
        this.inspectEquipmentForm = this.formBuilder.group({
            'equipmentCondition': ['', Validators.required],
            'equipmentSerial': ['', Validators.required],
            'equipmentValue': ['', Validators.required],
            'inspectionStatus': ['', Validators.required],
            'description': ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
        });
    }
}
