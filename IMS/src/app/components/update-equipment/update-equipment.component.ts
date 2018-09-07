import { Component, OnInit } from '@angular/core';
import { UpdateEquipmentService, iGetEquipmentDetails, iUpdateEquipment } from './update-equipment.service';
import { FormGroup, Validators, FormBuilder, Form } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ToastrNotificationService } from '../../globalServices/toastr-notification.service';
import { DatePipe } from '@angular/common';
import {Location} from "@angular/common";

@Component({
    selector: 'app-update-equipment',
    templateUrl: './update-equipment.component.html',
    styleUrls: ['./update-equipment.component.css'],
    providers: [UpdateEquipmentService, DatePipe]
})
export class UpdateEquipmentComponent implements OnInit {

    constructor(private service: UpdateEquipmentService, private fBuilder: FormBuilder, private aRouter: ActivatedRoute, private toastr: ToastrNotificationService,
        private date: DatePipe, private router: Router,private location:Location) {
    }

    public brands: any;
    public status: any;
    public position: any;
    public coords: any;
    public users: any;
    public types: any;
    public conditions: any;
    public sections: any;
    public suppliers: any;
    public equipmentDetails: any;
    public updateEquipmentForm: FormGroup;
    public id: any;
    public defaultImage: any;

    public today: any;

    ngOnInit() {
        this.today = new Date();
        let e: any;
        this.id = parseInt(this.aRouter.snapshot.paramMap.get('id'));

        let param: iGetEquipmentDetails =
        {
            id: this.id
        };
        this.service.GetBrands().subscribe(data => this.brands = data);
        this.service.GetSections().subscribe(data => this.sections = data);
        this.service.GetTypes().subscribe(data => this.types = data);
        this.service.GetSuppliers().subscribe(data => this.suppliers = data);
        this.buildForm();
        this.service.getEquipmentDetails(param).subscribe((res: any) => {
            this.equipmentDetails = res[0];
            this.updateEquipmentForm.controls['name'].setValue(this.equipmentDetails.Name);
            this.updateEquipmentForm.controls['desc'].setValue(this.equipmentDetails.Desc);
            this.updateEquipmentForm.controls['brand'].setValue(this.equipmentDetails.Brand);
            this.updateEquipmentForm.controls['section'].setValue(this.equipmentDetails.Section);
            this.updateEquipmentForm.controls['type'].setValue(this.equipmentDetails.Type);
            this.updateEquipmentForm.controls['suppliers'].setValue(this.equipmentDetails.Supplier);
        });
    }

    updateEquipment(e) {
        if (e.valid) {
            let param: iUpdateEquipment =
            {
                id: this.id,
                name: e.value['name'],
                desc: e.value['desc'],
                brand: e.value['brand'],
                section: e.value['section'],
                type: e.value['type'],
                supplier: e.value['suppliers']
            }
            console.log(param);
            this.service.UpdateEquipment(param).subscribe(data=>
            {
                let r=data[0];
                if(r['TRUE']==1)
                {
                    this.toastr.updateEquipmentSuccess();
                }
                else if(r['FALSE']==0)
                {
                    this.toastr.noChange();
                }
            });
        }
        else if (e.invalid)
            this.toastr.formFailure();

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
        this.location.back();
    }

    buildForm(): void {
        this.updateEquipmentForm = this.fBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'desc': [],
            'brand': ['', Validators.required],
            'section': ['', Validators.required],
            'type': ['', Validators.required],
            'suppliers': ['', Validators.required]
        });
    }
}