import { Component, OnInit } from '@angular/core';
import { DeactivateUserService, iUser } from "./deactivate-user.service";
import { AddUserService } from "../add-user/add-user.service";
import { ToastrService } from "ngx-toastr";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.css'],
    providers: [DeactivateUserService,AddUserService]
})
export class DeactivateUserComponent implements OnInit {
  // Global variable
  public users:any;
  public userType:any;
  public status:any;

  // Default Constructor
  constructor(private service:DeactivateUserService,private adduser:AddUserService,private toastr: ToastrService,private login:LoginService) { }

  // Form Load
  ngOnInit() {
    // Load users array
    this.service.getUsers(this.login.getUserID()).subscribe(data => this.users = data);

    // Load user types array
    this.adduser.getUserType().subscribe(data => this.userType = data);
  }

  // Update Status
  updateUser(input,e,user) {
  if(e == true)
  {
    this.status = 1;
  }
  else if (e == false)
  {
    this.status = 0;
  }

  let param: iUser = {
      UserID:input,
      Status:status
  };

  this.service.updateStatus(param)
      .subscribe(data =>{
    let result = data;
    if(result = true){
      if(e == true) {
          this.toastr.success(user + "'s status has been activated!", "Success!");
      }
      else if (e == false) {
          this.toastr.warning(user + "'s status has been deactivated!", "Success!");
      }
    }
  },
  error => this.toastr.error('An error has occurred. Your changes have not been updated. '+error.message+'Please contact the administrator.','Watch out!')
  );
  }
}
