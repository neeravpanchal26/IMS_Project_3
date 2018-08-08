import { Component, OnInit } from '@angular/core';
import { iAddUser } from "./add-user.service";
import { AddUserService } from "./add-user.service";
import { iSuburb} from "./add-user.service";
import { GlobalService} from "../../globalAssets/global.service";
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
    providers:[AddUserService]
})
export class AddUserComponent implements OnInit {
    // Global Variables
    public cities: any;
    public suburbs: any;
    public userType: any;
    public emailCheck:boolean;
    public phoneCheck:boolean;
    public addUserForm:FormGroup;
    public maxDate:any;
    public myColors = ['#ff0000', '#ffff00', '#00ff00', '#00ff00', '#00ff00'];
    public Labels = ['Weak', 'Fair', 'Good', 'Strong', 'Great'];

    // Default Constructor
    constructor(private service:AddUserService,
                private gService:GlobalService,
                private formBuilder:FormBuilder) { }

    // Form Load
    ngOnInit() {
      // Max Date of birth
      let date = new Date();
      this.maxDate = new Date((date.getFullYear()-18),date.getMonth(),date.getDate());

      // Form Validation
      this.buildForm();

      // City Load up
      this.service.getCity()
          .subscribe(
              data => this.cities = data,
              error=> this.gService.handleError(error));

      // User Type Load up
      this.service.getUserType()
          .subscribe(
              data => this.userType = data,
              error=> this.gService.handleError(error));
    }

    // Add User Method
    addUser(e) {
        if(e.valid) {
            // Setting Variables
            this.phoneCheck=false;
            this.emailCheck=false;

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

            let result: any;
            this.service.createUser(param)
                .subscribe(
                    data => {
                        let r = data[0];
                        if (r['TRUE'] == 1) {
                            this.gService.addUserSuccess(param.firstName, param.lastName);
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
                    error => this.gService.handleError(error));
        }
        if(e.invalid)
            this.gService.formFailure();
    }

    // Suburb Load Method
    subLoad(e) {
        let param: iSuburb = {
            city: e
        };
        this.service.getSuburb(param)
            .subscribe(
                data => this.suburbs=data,
                error=> this.gService.handleError(error));
    }

    // Form Builder
    buildForm():void {
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.addUserForm = this.formBuilder.group({
            'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'surname':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'dob':['',Validators.compose([Validators.required])],
            'contact':['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
            'email':['',Validators.compose([Validators.required,Validators.pattern(emailPattern),Validators.maxLength(100)])],
            'password':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
            'type':['',Validators.required],
            'address1':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'address2':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
            'city':['',Validators.required],
            'suburb':['',Validators.required]
        });
    }
}