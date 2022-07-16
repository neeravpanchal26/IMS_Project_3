import {Component, OnInit} from '@angular/core';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {Location} from "@angular/common";
import {BrandService, iBrand} from "./brand.service";

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.css'],
    providers: [BrandService]
})
export class BrandComponent implements OnInit {
    // Global Variables
    public addForm: FormGroup;

    // Default Constructor
    constructor(private tService: ToastrNotificationService,
                private formBuilder: FormBuilder,
                private location: Location,
                private service: BrandService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();
    }

    // Add Brand Function
    add(e) {
        if (e.valid) {
            let param: iBrand = {name: e.value['name']};
            this.service.addBrand(param)
                .subscribe
                (
                    data => {
                        if (data == true) {
                            this.tService.addBrandSuccess();
                            e.reset();
                        }
                    }, error => this.tService.handleError(error));
        }
    }

    // Locate Back
    locateBack() {
        this.location.back();
    }

    // Form Builder
    buildForm(): void {
        this.addForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])]
        });
    }
}
