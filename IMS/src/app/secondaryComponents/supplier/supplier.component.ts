import {Component, OnInit} from '@angular/core';
import {iSupplier, SupplierService} from "./supplier.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {Location} from "@angular/common";
import {e} from "@angular/core/src/render3";

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.css'],
    providers:[SupplierService]
})
export class SupplierComponent implements OnInit {
    // Global Variable
    public addForm: FormGroup;
    public emailCheck: boolean;
    public phoneCheck: boolean;

    // Default Constructor
    constructor(private tService: ToastrNotificationService,
                private formBuilder: FormBuilder,
                private location: Location,
                private service: SupplierService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();
    }

    // Add Brand Function
    add(e) {
        if (e.valid) {
            let param: iSupplier = {
                name: e.value['name'],
                number: e.value['contact'],
                email: e.value['email']
            };
            this.service.addSupplier(param)
                .subscribe
                (
                    data => {
                        if (data == true) {
                            this.tService.addSupplierSuccess();
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
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.addForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'contact': ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailPattern), Validators.maxLength(100)])]
        });
    }

}
