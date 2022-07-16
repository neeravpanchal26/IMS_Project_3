import {Component, OnInit} from '@angular/core';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {Location} from "@angular/common";
import {TypeService, iType} from "./type.service";

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.css'],
    providers: [TypeService]
})
export class TypeComponent implements OnInit {
    // Global Variable
    public addForm: FormGroup;

    constructor(private tService: ToastrNotificationService,
                private formBuilder: FormBuilder,
                private location: Location,
                private service: TypeService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();
    }

    // Add Brand Function
    add(e) {
        if (e.valid) {
            let param: iType = {name: e.value['name']};
            this.service.addType(param)
                .subscribe
                (
                    data => {
                        if (data == true) {
                            this.tService.addTypeSuccess();
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
