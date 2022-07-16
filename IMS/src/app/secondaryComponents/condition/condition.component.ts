import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {Location} from "@angular/common";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {ConditionService, iCondition} from "./condition.service";

@Component({
    selector: 'app-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.css'],
    providers: [ConditionService]
})
export class ConditionComponent implements OnInit {
    // Global Variable
    public addConditionForm: FormGroup;

    // Default Constructor
    constructor(private location: Location,
                private tService: ToastrNotificationService,
                private service: ConditionService,
                private formBuilder:FormBuilder) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();
    }

    // Add Condition
    addCondition(e) {
        if(e.valid) {
            let param:iCondition = {name:e.value['name']};
            this.service.addCondition(param)
                .subscribe(data=>{
                    if(data==true)
                    {
                        this.tService.addConditionSuccess();
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
    buildForm():void {
        this.addConditionForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])]
        });
    }
}
