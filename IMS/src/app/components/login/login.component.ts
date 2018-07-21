import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { iLogin } from "./login.service";
import { ToastrService } from "ngx-toastr";
import { handleError} from "../error/error";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // Global Declaration
    private result:any;

    // Default Constructor
    constructor(private service:LoginService,
                private router:Router,
                private toastr:ToastrService) {}

    // Form Load
    ngOnInit() {}

    // Login check method
    loginCheck(e)
    {
        if(e.target.elements[0].value!=null && e.target.elements[1].value!=null) {
            this.login(e.target.elements[0].value,e.target.elements[1].value);
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
                    if(this.result['Status'] == 1)
                    {
                        this.toastr.success("Welcome "+this.result['username'],'Success!');
                        this.service.setUserLoggedIn(this.result['UserTypeID'],this.result['username'],this.result['UserID']);
                        this.router.navigate(['dashboard']);
                    }
                    else if(this.result['FALSE'] == 0)
                    {
                        this.toastr.warning('Change a few things up and try submitting again.','Failure!');
                    }
                    else if(this.result['Status'] == 0) {
                        this.toastr.warning(this.result['username']+' Please contact the administrator. Your account has been deactivated.','Failure!');
                    }
                },
                error => this.toastr.error(handleError(error),'Oops!')
            );
    }
}