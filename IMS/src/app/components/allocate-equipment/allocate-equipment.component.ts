import {Component, OnInit} from '@angular/core';
import {AllocateEquipmentService, iAllocation, iEquipment} from './allocate-equipment.service';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {DatePipe} from '../../../../node_modules/@angular/common';
import {ActivatedRoute} from '../../../../node_modules/@angular/router';
import {FormBuilder, FormGroup, Validators} from '../../../../node_modules/@angular/forms';
import {environment} from "../../../environments/environment";
import {Location} from "../../../../node_modules/@angular/common";

@Component({
    selector: 'app-allocate-equipment',
    templateUrl: './allocate-equipment.component.html',
    styleUrls: ['./allocate-equipment.component.css'],
    providers: [AllocateEquipmentService, DatePipe]
})
export class AllocateEquipmentComponent implements OnInit {

    constructor(private service: AllocateEquipmentService,
                private tService: ToastrNotificationService,
                private date: DatePipe,
                private router: ActivatedRoute,
                private formBuilder: FormBuilder,
                private location:Location) {
    }

    public equipment: any;
    public techEmployees: any;
    public userEquipment: any;
    public today: any;
    public filter: null;
    public allocateEquipmentForm: FormGroup;
    public p = null;
    public id: any;
    public equipmentPicture: any;
    public allocationTypes: any;
    public apiUrl = environment.api;

    ngOnInit() {
        this.id = parseInt(this.router.snapshot.paramMap.get('id'));
        let param: iEquipment = {id: this.id};
        this.service.getEquipmentDetails(param).subscribe(data => this.equipment = data[0]);
        this.getImage(param);
        this.service.getTechEmployees().subscribe(data => this.techEmployees = data);
        this.service.getAllocationTypes().subscribe(data => this.allocationTypes = data);
        //this.service.getUserEquipment().subscribe(data=>this.userEquipment=data);
        this.buildForm();
    }

    getImage(param) {
        this.service.getEquipmentPicture(param)
            .subscribe(
                data => {
                    this.equipmentPicture = this.service.sanitizeEquipmentPicture(data);
                    if(data.size == 0)
                        this.equipmentPicture = this.apiUrl+'/api/Assets/blank350x150.png';
                },
                error1 => this.tService.handleError(error1));
    }

    allocateEquipment(e) {
        if (e.valid) {
            let uID = e.value['user'];
            let param: iAllocation = {
                desc: e.value['desc'], alType: e.value['allocation'], equipmentID: this.id, userID: e.value['user']
            };
            this.service.allocateEquipment(param).subscribe(data => {
                    if (data == true) {
                        this.tService.allocationSuccess(this.id, uID);
                    }
                },
                error => this.tService.handleError(error));
        }
        else if (e.invalid)
            this.tService.formFailure();
    }

    // Locate Back
    locateBack() {
        this.location.back();
    }

    buildForm(): void {
        this.allocateEquipmentForm = this.formBuilder.group({
            'serial': [''],
            'name': [''],
            'desc': [],
            'user': ['', Validators.compose([Validators.required])],
            'allocation': ['', Validators.compose([Validators.required])]
        });
    }
}