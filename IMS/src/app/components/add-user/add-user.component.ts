import { Component, OnInit } from '@angular/core';
import { iAddUser } from "./add-user.service";
import { AddUserService } from "./add-user.service";
import { iSuburb} from "./add-user.service";
import { ToastrService} from "ngx-toastr";
import {handleError} from "../error/error";

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
  constructor(private service:AddUserService,private toastr:ToastrService) { }

  ngOnInit() {
      // City Load up
      this.service.getCity().subscribe(data => this.cities = data);
      // User Type Load up
      this.service.getUserType().subscribe(data => this.userType = data);
  }
  // Add User Method
    addUser(e) {
        let param: iAddUser = {
            firstName: e.target.elements[0].value,
            lastName: e.target.elements[1].value,
            dob: e.target.elements[2].value,
            contactNumber: e.target.elements[3].value,
            email: e.target.elements[4].value,
            password: e.target.elements[5].value,
            userType: e.target.elements[6].value,
            address1: e.target.elements[7].value,
            address2: e.target.elements[8].value,
            suburb: e.target.elements[9].value
        };
        console.log(param);
        let result: any;
        this.service.createUser(param)
            .subscribe(response => {result = response; console.log(result); },
                    error => this.toastr.error(handleError(error),'Oops!'));
    }
    // Suburb Load Method
    subLoad(e) {
        let param: iSuburb = {
            city: e
        };
        this.service.getSuburb(param).subscribe(data => this.suburbs=data);
    }
}
