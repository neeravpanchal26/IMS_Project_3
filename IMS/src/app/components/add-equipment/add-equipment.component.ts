import {Component, OnInit, ViewChild} from '@angular/core';
import {AddEquipmentService, iAddEquipment} from './add-equipment.service';
import {GeoLocationService} from '../../globalServices/geolocation.service';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from '../../../../node_modules/@angular/forms';
import {DatePipe} from '../../../../node_modules/@angular/common';
import {HttpErrorResponse} from '../../../../node_modules/@angular/common/http';
import {Router} from "@angular/router";
import {Location} from "../../../../node_modules/@angular/common";

@Component({
    selector: 'app-add-equipment',
    templateUrl: './add-equipment.component.html',
    styleUrls: ['./add-equipment.component.css'],
    providers: [AddEquipmentService, DatePipe]
})

export class AddEquipmentComponent implements OnInit {
    @ViewChild('EquipmentImage') newEquipmentImage;
    public brands: any;
    public status: any;
    public position: any;
    public coords: any;
    public users: any;
    public types: any;
    public conditions: any;
    public sections: any;
    public suppliers: any;
    public addEquipmentForm: FormGroup;
    public barcodeError: boolean;
    public today: any;
    public defaultImage: any;
    public maxDate: any;

    constructor(private service: AddEquipmentService,
                private location: GeoLocationService,
                private tService: ToastrNotificationService,
                private fBuilder: FormBuilder,
                private date: DatePipe,
                private router: Router,
                private l: Location) {
    }

    ngOnInit() {
        // Max Date of birth
        this.maxDate = new Date();

        this.service.GetBrands().subscribe(data => this.brands = data);
        this.service.GetStatus().subscribe(data => this.status = data);
        this.service.GetConditions().subscribe(data => this.conditions = data);
        this.service.GetSections().subscribe(data => this.sections = data);
        this.service.GetTypes().subscribe(data => this.types = data);
        this.service.GetSuppliers().subscribe(data => this.suppliers = data);
        this.defaultImage = '/assets/blank350x150.png';
        this.buildForm();


        this.today = new Date();
    }

    getLocation() {
        this.location.getLocation().subscribe(data => this.position = data);

    }

    getToday() {
        this.maxDate = this.date.transform(this.today, 'yyyy-MM-dd');

        this.addEquipmentForm.controls['dateReceived'].setValue(this.maxDate);
    }

    addEquipment(e, type) {
        if (e.valid) {
            this.barcodeError = false;
            let desc = '';
            if (e.value['desc'] != null)
                desc = e.value['desc'];
            let param: iAddEquipment =
                {
                    name: e.value['name'],
                    desc: desc,
                    cost: e.value['cost'],
                    equipmentCondition: e.value['condition'],
                    brand: e.value['brand'],
                    section: e.value['section'],
                    type: e.value['type'],
                    dateReceived: e.value['dateReceived'],
                    barcode: e.value['barcode'],
                    supplier: e.value['suppliers']
                };
            this.service.AddEquipment(param).subscribe(data => {
                    let r = data[0];
                    if (r['barcodeError'] == 1) {
                        this.barcodeError = true;
                    }
                    else if (r['TRUE'] == 1) {

                        this.tService.addEquipmentSuccess(e.value['name']);
                        try {
                            let image = this.newEquipmentImage.nativeElement;
                            let newImage = image.files[0];
                            let allowedImages = ['image/jpeg', 'image/png'];
                            if (allowedImages.indexOf(newImage.type) > -1) {
                                let frmData = new FormData();
                                frmData.append('file', newImage);
                                this.service.uploadImage(frmData).subscribe();
                            }
                        } catch {
                        }
                    }
                },
                error1 => this.tService.handleError(error1));
        }
        else if (e.invalid)
            this.tService.formFailure();
    }

    // Add Condition
    addCondition(e) {
        if (e == 'addCondition') {
            this.router.navigate(['condition']);
        }
        else if (e == 'addBrand') {
            this.router.navigate(['brand']);
        }
        else if (e == 'addSection') {
            this.router.navigate(['section']);
        }
        else if (e == 'addType') {
            this.router.navigate(['type']);
        }
        else if (e == 'addSupplier') {
            this.router.navigate(['supplier']);
        }
    }

    // Locate Back
    locateBack() {
        this.l.back();
    }

    buildForm(): void {

        this.addEquipmentForm = this.fBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'desc': [],
            'cost': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            'condition': ['', Validators.required],
            'brand': ['', Validators.required],
            'section': ['', Validators.required],
            'type': ['', Validators.required],
            'dateReceived': ['', Validators.compose([Validators.required, Validators.max(this.maxDate)])],
            'barcode': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            'suppliers': ['', Validators.required]

        });
    }

}


