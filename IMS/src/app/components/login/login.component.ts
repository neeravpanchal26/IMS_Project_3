import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { iLogin } from "./login.service";
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HeaderService} from "../header/header.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { ImageRetrieveService} from "../../globalServices/image-retrieve.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers:[HeaderService]
})
export class LoginComponent implements OnInit {
    // Global Declaration
    private result:any;
    public logo:any;
    loginForm:FormGroup;

    // Default Constructor
    constructor(private service:LoginService,
                private router:Router,
                private header:HeaderService,
                private tService:ToastrNotificationService,
                private iService:ImageRetrieveService,
                private formBuilder:FormBuilder) {}

    // Form Load
    ngOnInit() {
        // Form validation
        this.buildForm();

        // Load Logo
        this.iService.getLogo()
            .subscribe(
                data => this.logo = this.iService.selectPhoto(data),
                error => this.tService.handleError(error));
    }

    // Login check method
    loginCheck(e)
    {
        if(e.valid) {
            let param:iLogin = {
                username: e.value['email'].toLowerCase(),
                password: e.value['password']
            };
            this.service.check(param)
                .subscribe
                (
                    data =>
                    {
                        this.result = data[0];
                        if(this.result['Active'] == 1) {
                            this.tService.loginSuccess(this.result['username']);
                            this.service.setUserLoggedIn(this.result['UserTypeID'],this.result['username'],this.result['UserID']);
                            this.router.navigate(['dashboard']);
                            e.controls['password'].reset();
                        }
                        else if(this.result['FALSE'] == 0) {
                            this.tService.loginFailure();
                            e.controls['password'].reset();
                        }
                        else if(this.result['Active'] == 0) {
                            this.tService.loginDeactivated(this.result['username']);
                            e.controls['password'].reset();
                        }
                    },
                    error => this.tService.handleError(error));
        }
    }

    // Form Builder
    buildForm():void {
        let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.loginForm = this.formBuilder.group({
            'email':['',Validators.compose([Validators.required,Validators.pattern(emailPattern)])],
            'password':['',Validators.compose([Validators.required,Validators.minLength(8)])]
        });
    }
}