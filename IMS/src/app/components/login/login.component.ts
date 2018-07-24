import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { iLogin } from "./login.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderService} from "../header/header.service";
import { GlobalService} from "../../globalAssets/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers:[HeaderService]
})
export class LoginComponent implements OnInit {
    // Global Declaration
    private result:any;
    public loginForm:FormGroup;
    public logo:any;

    // Default Constructor
    constructor(private service:LoginService,
                private router:Router,
                private header:HeaderService,
                private gService:GlobalService) {}

    // Form Load
    ngOnInit() {
        // Form validation
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")
            ]),
            password: new FormControl('', [
                Validators.minLength(8),
                Validators.required
            ])
        });

        // Load Logo
        this.gService.getLogo()
            .subscribe(
                data => this.logo = this.gService.selectPhoto(data),
                error => this.gService.handleError(error));
    }

    // Login check method
    loginCheck(e)
    {
        if(e.target.elements[0].value!=null && e.target.elements[1].value!=null) {
            this.login(e.target.elements[0].value.toLowerCase(),e.target.elements[1].value);
        }
    }

    // Login method
    login(username,password)
    {
        let param:iLogin = {
            username: username,
            password: password
        };
        this.service.check(param)
            .subscribe
            (
                data =>
                {
                    this.result = data[0];
                    if(this.result['Active'] == 1) {
                        this.gService.loginSuccess(this.result['username']);
                        this.service.setUserLoggedIn(this.result['UserTypeID'],this.result['username'],this.result['UserID']);
                        this.router.navigate(['dashboard']);
                    }
                    else if(this.result['FALSE'] == 0) {
                        this.gService.loginFailure();
                    }
                    else if(this.result['Active'] == 0) {
                        this.gService.loginDeactivated(this.result['username']);
                    }
                },
                error => this.gService.handleError(error));
    }
}