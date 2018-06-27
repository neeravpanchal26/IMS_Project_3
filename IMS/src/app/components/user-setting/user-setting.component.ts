import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import {iUpdateUserInfo, UserSettingService} from "./user-setting.service";
import { AddUserService, iSuburb} from "../add-user/add-user.service";
import {iUpdate} from "../user-password-reset/user-password-reset.service";
import {e} from "@angular/core/src/render3";

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css'],
    providers:[UserSettingService,AddUserService]
})
export class UserSettingComponent implements OnInit {
    // Global Variable
    public user:any;
    public cities: any;
    public suburbs: any;
    public result:boolean;

    // Default Constructor
    constructor(private service:UserSettingService,private login:LoginService,private addUser:AddUserService) {}

    // Form Load
    ngOnInit() {
        // City Load up
        this.addUser.getCity().subscribe(data => this.cities = data);
        // Suburb Load up
        this.service.getAllSuburb().subscribe(data => this.suburbs = data);
        // User Load up
        this.service.getSpecificUser(this.login.getUserID()).subscribe(data=> {let r = data[0];this.user=r});
    }

    // Suburb Load Method
    subLoad(e) {
        let param: iSuburb = { city: e };
        this.addUser.getSuburb(param).subscribe(data => this.suburbs = data);
    }

    // Update user info Method
    updateUserInfo(e)
    {
        let param:iUpdateUserInfo = {
            userID:this.login.getUserID(),
            firstName:e.target.elements[0].value,
            lastName:e.target.elements[1].value,
            dob:e.target.elements[2].value,
            contactNumber:e.target.elements[3].value,
            email:e.target.elements[4].value,
            address1:e.target.elements[5].value,
            address2:e.target.elements[6].value,
            suburb:e.target.elements[8].value
        }
        this.service.updateUserInfo(param)
            .subscribe(data => this.result = data);
    }
}
