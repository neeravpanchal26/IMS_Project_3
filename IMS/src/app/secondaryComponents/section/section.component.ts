import {Component, OnInit} from '@angular/core';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {Location} from "@angular/common";
import {iSection, SectionService} from "./section.service";

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css'],
    providers: [SectionService]
})
export class SectionComponent implements OnInit {
    // Global Variable
    public addForm: FormGroup;

    // Default Constructor
    constructor(private service: SectionService,
                private formBuilder: FormBuilder,
                private location: Location,
                private tService: ToastrNotificationService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();
    }

    // Add Brand Function
    add(e) {
        if (e.valid) {
            let param: iSection = {name: e.value['name']};
            this.service.addSection(param)
                .subscribe
                (
                    data=>{
                        if(data == true) {
                            this.tService.addSectionSuccess();
                            e.reset();
                        }
                    },error => this.tService.handleError(error));
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
