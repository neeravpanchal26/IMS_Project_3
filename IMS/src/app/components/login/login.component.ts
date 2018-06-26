import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { iLogin } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // Global Declaration
    private result:any;
    public status:boolean;

    // Default Constructor
    constructor(private service:LoginService,private router:Router) {}

    // Form Load
    ngOnInit() {}

    // Login check method
    loginCheck(e)
    {
        e.preventDefault();
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
                        this.status = true;
                        this.service.setUserLoggedIn(this.result['UserTypeID'],this.result['username'],this.result['UserID']);
                        this.router.navigate(['dashboard']);
                    }
                    else if(this.result['Status'] == 0)
                    {
                        this.status = false;
                    }
                    else
                    {
                        this.status = false;
                    }
                }
            );
    }
}
