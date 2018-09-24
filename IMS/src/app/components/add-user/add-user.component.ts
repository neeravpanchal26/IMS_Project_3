import {Component, OnInit} from '@angular/core';
import {iAddUser} from "./add-user.service";
import {AddUserService} from "./add-user.service";
import {iSuburb} from "./add-user.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {Router} from "@angular/router";
import {isNumber} from "util";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [AddUserService]
})
export class AddUserComponent implements OnInit {
    // Global Variables
    public cities: any;
    public suburbs: any;
    public userType: any;
    public emailCheck: boolean;
    public phoneCheck: boolean;
    public addUserForm: FormGroup;
    public maxDate: any;
    public myColors = ['#ff0000', '#ffff00', '#00ff00', '#00ff00', '#00ff00'];
    public Labels = ['Weak', 'Fair', 'Good', 'Strong', 'Great'];

    // Default Constructor
    constructor(private service: AddUserService,
                private tService: ToastrNotificationService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    // Form Load
    ngOnInit() {
        // Max Date of birth
        let date = new Date();
        this.maxDate = new Date((date.getFullYear() - 18), date.getMonth(), date.getDate());

        // Form Validation
        this.buildForm();

        // City Load up
        this.service.getCity()
            .subscribe(
                data => this.cities = data,
                error => this.tService.handleError(error));

        // User Type Load up
        this.service.getUserType()
            .subscribe(
                data => this.userType = data,
                error => this.tService.handleError(error));
    }

    // Add User Method
    addUser(e) {
        let mDate = this.maxDate.toString().split(' ');
        let iDate = e.value['dob'].toString().split('-');
        if (iDate[0] > mDate[3])
            this.addUserForm.controls['dob'].setErrors({incorrect: true});
        else if (isNumber(e.value['contact'] == false)) {
            this.addUserForm.controls['contact'].setErrors({incorrect: true});
        }
        else {
            if (e.valid) {
                // Setting Variables
                this.phoneCheck = false;
                this.emailCheck = false;

                let param: iAddUser = {
                    firstName: e.value['name'],
                    lastName: e.value['surname'],
                    dob: e.value['dob'],
                    contactNumber: e.value['contact'],
                    email: e.value['email'].toLowerCase(),
                    password: e.value['password'],
                    userType: e.value['type'],
                    address1: e.value['address1'],
                    address2: e.value['address2'],
                    suburb: e.value['suburb']
                };
                this.service.createUser(param)
                    .subscribe(
                        data => {
                            let r = data[0];
                            if (r['TRUE'] == 1) {
                                this.tService.addUserSuccess(param.firstName, param.lastName);
                                e.reset();
                            }
                            if (r['emailExists'] == 1) {
                                this.emailCheck = true;
                            }
                            else if (r['phoneExists'] == 1) {
                                this.phoneCheck = true;
                            }
                            else if (r['bothExists'] == 1) {
                                this.phoneCheck = true;
                                this.emailCheck = true;
                            }
                        },
                        error => this.tService.handleError(error));
            }
            else if (e.invalid) {
                this.markFormGroupTouched(e);
                this.tService.formFailure();
            }
        }
    }

    // Mark As Touched
    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    // Suburb Load Method
    subLoad(e) {
        if (e == 'manage city') {
            this.router.navigate(['city']);
        }
        else {
            let param: iSuburb = {
                city: e
            };
            this.service.getSuburb(param)
                .subscribe(
                    data => this.suburbs = data,
                    error => this.tService.handleError(error));
        }
    }

    // Add Suburb relocated
    suburb(e) {
        if (e == 'manage suburb')
            this.router.navigate(['suburb']);
    }

    // Form Builder
    buildForm(): void {
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.addUserForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'surname': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'dob': ['', Validators.compose([Validators.required])],
            'contact': ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailPattern), Validators.maxLength(100)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
            'type': ['', Validators.required],
            'address1': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'address2': ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
            'city': ['', Validators.required],
            'suburb': ['', Validators.required]
        });
    }
}