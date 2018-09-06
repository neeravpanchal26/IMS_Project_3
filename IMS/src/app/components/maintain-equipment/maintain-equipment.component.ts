import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {Subscription} from "rxjs";
import {QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";
import * as L from 'leaflet';
import {iMaintain, MaintainEquipmentService} from "./maintain-equipment.service";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {GeoLocationService} from "../../globalServices/geolocation.service";
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";

@Component({
    selector: 'app-maintain-equipment',
    templateUrl: './maintain-equipment.component.html',
    styleUrls: ['./maintain-equipment.component.css'],
    providers: [MaintainEquipmentService]
})
export class MaintainEquipmentComponent implements OnInit {
    // Global Variables
    public maintainEquipmentForm: FormGroup;
    public subscription: Subscription;
    public apiUrl = environment.api;
    public equipment;
    public condition;
    public map;
    public equipmentInfo;
    public image;

    // Native Html Elements
    @ViewChild('conditionPicture') newBusinessLogo;

    // Default Constructor
    constructor(private formBuilder: FormBuilder,
                private location: Location,
                private qrService: QrCodeDecoderService,
                private tService: ToastrNotificationService,
                private service: MaintainEquipmentService,
                private router: Router,
                private lService: LoginService,
                private geo:GeoLocationService,
                private iService:ImageRetrieveService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();

        // Get Equipment to maintain
        this.service.getEquipmentToMaintain(this.lService.getUserID())
            .subscribe(data => this.equipment = data,
                error => this.tService.handleError(error));

        // Get Condition
        this.service.getCondition()
            .subscribe(data => this.condition = data,
                error => this.tService.handleError(error));

        // Load up map
        this.geo.getLocation()
            .subscribe(
                data => {
                    let lat = data.coords.latitude;
                    let long = data.coords.longitude;
                    this.map = L.map('map').setView([lat, long], 14);
                    this.loadMap(this.map, lat, long);
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

        // Blank Image Load up
        this.image = this.apiUrl+'/api/Assets/blank350x150.png';
    }
    // Individual Equipment Load
    individualEquipmentLoad(e) {
        // Equipment Info
        this.service.getEquipmentInfoBySerial(e)
            .subscribe(
                data => {
                    this.equipmentInfo = data[0];
                    this.maintainEquipmentForm.controls['equipmentCondition'].setValue(this.equipmentInfo.Condition);
                    this.maintainEquipmentForm.controls['equipmentValue'].setValue(this.equipmentInfo.Value);
                    this.maintainEquipmentForm.controls['description'].setValue(this.equipmentInfo.Desc);
                    let coordinates = this.equipmentInfo.LocationGps.split(',', 2);
                    this.map.remove();
                    this.map = L.map('map').setView([coordinates[0], coordinates[1]], 14);
                    this.loadMap(this.map, coordinates[0], coordinates[1]);
                },
                error => this.tService.handleError(error));
        // Equipment Image
        this.service.getEquipmentImageBySerial(e)
            .subscribe(data =>
                {
                    this.image = this.iService.selectPhoto(data);
                    if(data.size == 0)
                        this.image = this.apiUrl+'/api/Assets/blank350x150.png';
                    },
                error=>this.tService.handleError(error));
    }

    // Maintain Equipment
    maintainEquipment(e) {
        if (e.valid) {
            let param: iMaintain =
                {
                    userID: this.lService.getUserID(),
                    serial: e.value['equipmentSerial'],
                    condition: e.value['equipmentCondition'],
                    value: parseFloat(e.value['equipmentValue']),
                    status: parseInt(e.value['inspectionStatus']),
                    description: e.value['description2']
                };
            this.service.insertMaintain(param)
                .subscribe(data => {
                        if (data[0].equipID > 0) {
                            // Image Upload
                            try {
                                // File validation
                                let image = this.newBusinessLogo.nativeElement;
                                let logoFile = image.files[0];
                                let allowedImages = ['image/jpeg', 'image/png'];
                                if (allowedImages.indexOf(logoFile.type) > -1) {
                                    // Logo upload
                                    let frmData = new FormData();
                                    frmData.append('file', logoFile);
                                    frmData.append('serial',e.value['equipmentSerial']);
                                    this.service.uploadImage(frmData)
                                        .subscribe();
                                }
                            } catch {}
                            this.tService.maintenanceSuccess();
                        }
                    },
                    error => this.tService.handleError(error));
        }
        else if (e.invalid)
            this.tService.formFailure();
    }

    // Add Condition
    addCondition(e) {
        if (e == 'addCondition') {
            this.router.navigate(['condition']);
        }
    }

    // Locate Back
    locateBack() {
        this.location.back();
    }

    // Qr Scanner fn
    onFileChange(event) {
        const file = event.target.files[0];
        this.subscription = this.qrService.decode(file)
            .subscribe(decodedString => {
                if (decodedString == 'error decoding QR Code')
                    this.tService.qrCodeScanError();
                else {
                    this.maintainEquipmentForm.controls['equipmentSerial'].setValue(decodedString);
                    this.individualEquipmentLoad(this.maintainEquipmentForm.controls['equipmentSerial'].value);
                }
            });

    }

    // Map fn
    loadMap(myMap, lat, long) {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibWxhbmdldmVsZDE1IiwiYSI6ImNqa2R1a3A5aTFpeXkza252cDlkbDQ2MXIifQ.uTJ2w8n_rjeHtl1usY3K9Q'
            }).addTo(myMap);
        L.marker([lat, long], {
            icon: L.icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: this.apiUrl + '/api/Assets/marker-icon.png',
                shadowUrl: this.apiUrl + '/api/Assets/marker-shadow.png'
            }), draggable: false
        }).openTooltip().addTo(myMap);
    }

    // Selection setter
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    // Form Builder
    buildForm(): void {
        this.maintainEquipmentForm = this.formBuilder.group({
            'equipmentCondition': ['', Validators.required],
            'equipmentSerial': ['', Validators.required],
            'equipmentValue': ['', Validators.required],
            'inspectionStatus': ['', Validators.required],
            'description': [''],
            'description2': ['', Validators.compose([Validators.required, Validators.maxLength(100)])]

        });
    }
}
