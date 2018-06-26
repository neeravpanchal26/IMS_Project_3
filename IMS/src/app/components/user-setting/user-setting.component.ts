import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { UserSettingService} from "./user-setting.service";
import { AddUserService, iSuburb} from "../add-user/add-user.service";

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
}
