import { Component, OnInit } from '@angular/core';
import { DeactivateUserService, iUser } from "./deactivate-user.service";
import { AddUserService } from "../add-user/add-user.service";
import { ToastrService } from "ngx-toastr";
import { LoginService} from "../login/login.service";
import { handleError} from "../error/error";
import { FormControl} from "@angular/forms";

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
  public search: FormControl;

  // Default Constructor
  constructor(private service:DeactivateUserService,
              private adduser:AddUserService,
              private toastr: ToastrService,
              private login:LoginService) { }

  // Form Load
  ngOnInit() {
    //Search users
    this.search = new FormControl();
    this.search.valueChanges
        .subscribe(
            data => this.service.getUsersByName(this.login.getUserID(),data)
                .subscribe(
                    data => this.users = data,
                    error=>this.toastr.error(handleError(error),'Oops!')
                    )
        );

    // Load users array
    this.service.getUsers(this.login.getUserID())
        .subscribe(
            data => this.users = data,
            error=>this.toastr.error(handleError(error),'Oops!'));

    // Load user types array
    this.adduser.getUserType()
        .subscribe(
            data => this.userType = data,
            error=>this.toastr.error(handleError(error),'Oops!'));
  }

  // Update Status
  updateUser(input,e,user) {
    let status;
  if(e == true)
  {
    status = 1;
  }
  else if (e == false)
  {
    status = 0;
  }
  let param: iUser = {
      UserID:input,
      Status:status
  };
  this.service.updateStatus(param)
      .subscribe(data =>{
    if(data == true){
      if(e == true) {
          this.toastr.success(user + "'s status has been activated!", "Success!");
      }
      else if (e == false) {
          this.toastr.warning(user + "'s status has been deactivated!", "Success!");
      }
    }
  },
          //Error handling
  error => this.toastr.error(handleError(error),'Oops!')
  );
  }

  // Change user type
  userTypeFunc(id,e,user){
    let param: iUser = {
      UserID:id,
      Status:e.target.value
    };

    this.service.updateType(param)
        .subscribe(data =>{
                if(data == true){
                    this.toastr.success(user + "'s role has been changed!", "Success!");
                }
            },
            //Error handling
            error => this.toastr.error(handleError(error),'Oops!')
        );
  }
}
