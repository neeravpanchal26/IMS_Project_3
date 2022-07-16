import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {BusinessFooterService} from "../business-footer/business-footer.service";
import {BusinessSettingService, iBusinesss} from "./business-setting.service";
import {FormGroup, FormBuilder, Validators, Form, FormControl} from '@angular/forms';
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import {Location} from "@angular/common";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-business-setting',
    templateUrl: './business-setting.component.html',
    styleUrls: ['./business-setting.component.css'],
    providers: [BusinessFooterService, BusinessSettingService]
})
export class BusinessSettingComponent implements OnInit {
    // Global Variables
    public businessLogo: any;
    public business: any = [];
    public businessForm: FormGroup;
    public apiUrl = environment.api;
    public png = 'Choose...';
    public pdf = 'Choose...';

    // Native Html Elements
    @ViewChild('BusinessLogo') newBusinessLogo;
    @ViewChild('BusinessGroupPolicy') newGroupPolicy;

    // Default Constructor
    constructor(private tService: ToastrNotificationService,
                private bFooter: BusinessFooterService,
                private service: BusinessSettingService,
                private formBuilder: FormBuilder,
                private iService: ImageRetrieveService,
                private location: Location) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();

        // Load Logo
        this.logo();

        // Load Business info
        this.bFooter.getBusinessInfo()
            .subscribe(
                data => {
                    // Load values onto form
                    this.businessForm.controls['name'].setValue(data[0].BusinessName);
                    this.businessForm.controls['contact'].setValue(data[0].contact);
                    this.businessForm.controls['email'].setValue(data[0].Email);
                },
                error => this.tService.handleError(error));
    }

    // logo
    logo() {
        this.iService.getLogo()
            .subscribe(
                data => {
                    this.businessLogo = this.iService.selectPhoto(data);
                    if (data.size == 0)
                        this.businessLogo = this.apiUrl + '/api/Assets/blank350x150.png';
                },
                error => this.tService.handleError(error));
    }

    // Business info update
    onSubmit(e) {
        if (e.valid) {
            try {
                // File validation
                let image = this.newBusinessLogo.nativeElement;
                let logoFile = image.files[0];
                let allowedImages = ['image/jpeg', 'image/png'];
                if (allowedImages.indexOf(logoFile.type) > -1) {
                    // Logo upload
                    let frmData = new FormData();
                    frmData.append('file', logoFile);
                    this.service.uploadImage(frmData)
                        .subscribe(data => this.logo());
                }
            } catch {
            }

            try {
                let pdf = this.newGroupPolicy.nativeElement;
                let groupPolicy = pdf.files[0];
                let allowedPdf = ['application/pdf'];
                if (allowedPdf.indexOf(groupPolicy.type) > -1) {
                    // Group Policy upload
                    let frmData = new FormData();
                    frmData.append('file', groupPolicy);
                    this.service.uploadGroupPolicy(frmData)
                        .subscribe();
                }
            } catch {
            }

            // Business Information Update
            let param: iBusinesss = {
                name: e.value['name'],
                contact: e.value['contact'],
                email: e.value['email']
            };
            this.service.updateInfo(param)
                .subscribe(
                    data => {
                        if (data == true) {
                            this.tService.businessUpdateSuccess();
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

    // Form Builder
    buildForm(): void {
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.businessForm = this.formBuilder.group({
            'logo': [''],
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'contact': ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailPattern), Validators.maxLength(45)])],
            'pdf': ['']
        });
    }
}