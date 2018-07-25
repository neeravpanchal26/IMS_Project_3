import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { iUpdateUserInfo, UserSettingService} from "./user-setting.service";
import { AddUserService, iSuburb} from "../add-user/add-user.service";
import {GlobalService} from "../../globalAssets/global.service";

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

    // Default Constructor
    constructor(private service:UserSettingService,
                private login:LoginService,
                private addUser:AddUserService,
                private gService:GlobalService) {}

    // Form Load
    ngOnInit() {
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

        // User Load up
        this.service.getSpecificUser(this.login.getUserID())
            .subscribe(
                data=> {let r = data[0];this.user=r},
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
        };
        this.service.updateUserInfo(param)
            .subscribe(
                data => {
                    if(data == true) {
                        this.gService.userSettingUpdateSuccess(param.firstName,param.lastName);
                    }
                },
                error=> this.gService.handleError(error));
    }
}
