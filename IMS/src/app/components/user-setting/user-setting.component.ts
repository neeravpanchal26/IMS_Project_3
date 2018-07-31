import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { iUpdateUserInfo, UserSettingService} from "./user-setting.service";
import { AddUserService, iSuburb} from "../add-user/add-user.service";
import { GlobalService} from "../../globalAssets/global.service";
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css'],
    providers:[UserSettingService,AddUserService]
})
export class UserSettingComponent implements OnInit {
    // Global Variable
    public user:any = [];
    public cities: any = [];
    public suburbs: any = [];
    public result:boolean;
    public maxDate:any;
    public settingForm:FormGroup;

    // Default Constructor
    constructor(private service:UserSettingService,
                private login:LoginService,
                private addUser:AddUserService,
                private gService:GlobalService,
                private formBuilder:FormBuilder) {}

    // Form Load
    ngOnInit() {
        // Max Date of birth
        let date = new Date();
        this.maxDate = new Date((date.getFullYear()-18),date.getMonth(),date.getDate());

        // Form Validation
        this.buildForm();

        // User Load up
        this.service.getSpecificUser(this.login.getUserID())
            .subscribe(
                data=> {
                    this.user = data[0];
                    // Load values onto form
                    this.settingForm.controls['name'].setValue(this.user.FirstName);
                    this.settingForm.controls['surname'].setValue(this.user.Surname);
                    this.settingForm.controls['dob'].setValue(this.user.Dob);
                    this.settingForm.controls['contact'].setValue(this.user.ContactNumber);
                    this.settingForm.controls['email'].setValue(this.user.Email);
                    this.settingForm.controls['address1'].setValue(this.user.Address1);
                    this.settingForm.controls['address2'].setValue(this.user.Address2);
                    this.settingForm.controls['city'].setValue(this.user.CityID);
                    this.settingForm.controls['suburb'].setValue(this.user.Suburb);
                },
                error=> this.gService.handleError(error));

        // City Load up
        this.addUser.getCity()
            .subscribe(
                data => this.cities = data,
                error=> this.gService.handleError(error));

        // Suburb Load up
        this.service.getAllSuburb()
            .subscribe(
                data => this.suburbs = data,
                error=> this.gService.handleError(error));

    }

    // Suburb Load Method
    subLoad(e) {
        let param: iSuburb = { city: e };
        this.addUser.getSuburb(param)
            .subscribe(
                data => this.suburbs = data,
                error=> this.gService.handleError(error));
    }

    // Update user info Method
    updateUserInfo(e)
    {
        if(e.valid) {
            let param: iUpdateUserInfo = {
                userID: this.login.getUserID(),
                firstName: e.value['name'],
                lastName: e.value['surname'],
                dob: e.value['dob'],
                contactNumber: e.value['contact'],
                email: e.value['email'],
                address1: e.value['address1'],
                address2: e.value['address2'],
                suburb: e.value['suburb']
            };
            this.service.updateUserInfo(param)
                .subscribe(
                    data => {
                        if (data == true) {
                            this.gService.userSettingUpdateSuccess(param.firstName, param.lastName);
                        }
                    },
                    error => this.gService.handleError(error));
        }
    }

    // Form Builder
    buildForm():void {
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.settingForm = this.formBuilder.group({
            'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'surname':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'dob':['',Validators.compose([Validators.required])],
            'contact':['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
            'email':['',Validators.compose([Validators.required,Validators.pattern(emailPattern),Validators.maxLength(100)])],
            'address1':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'address2':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'city':['',Validators.required],
            'suburb':['',Validators.required]
        });
    }
}
