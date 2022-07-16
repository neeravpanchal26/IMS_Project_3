import {Component, OnInit} from '@angular/core';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {CityService, iCity} from "./city.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css'],
    providers: [CityService]
})
export class CityComponent implements OnInit {
    // Global Variable
    public addCityForm: FormGroup;

    // Default constructor
    constructor(private tService: ToastrNotificationService,
                private formBuilder: FormBuilder,
                private service: CityService,
                private location: Location) {
    }

    // Form load
    ngOnInit() {
        // Form Validation
        this.buildAddCityForm();
    }

    // Add City Function
    addCity(e) {
        if (e.valid) {
            let param: iCity = {
                name: e.value['name']
            };
            this.service.addCity(param)
                .subscribe
                (
                    data => {
                        if (data == true) {
                            this.tService.addCitySuccess();
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
    buildAddCityForm(): void {
        this.addCityForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])]
        });
    }
}
