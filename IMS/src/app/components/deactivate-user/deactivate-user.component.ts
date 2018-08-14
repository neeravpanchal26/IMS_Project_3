import { Component, OnInit } from '@angular/core';
import { DeactivateUserService, iUser } from "./deactivate-user.service";
import { AddUserService } from "../add-user/add-user.service";
import { LoginService} from "../login/login.service";
import { FormControl} from "@angular/forms";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";

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
  public filter:null;
  public p = null;

  // Default Constructor
  constructor(private service:DeactivateUserService,
              private adduser:AddUserService,
              private login:LoginService,
              private tService:ToastrNotificationService) { }

  // Form Load
  ngOnInit() {
    // Load users array
    this.service.getUsers(this.login.getUserID())
        .subscribe(
            data => this.users = data,
            error=> this.tService.handleError(error));

    // Load user types array
    this.adduser.getUserType()
        .subscribe(
            data => this.userType = data,
            error=> this.tService.handleError(error));
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
        this.tService.activatedSuccess(user);
      }
      else if (e == false) {
        this.tService.deactivatedSuccess(user);
      }
    }
  },
  error => this.tService.handleError(error));
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
                  this.tService.userRoleChange(user);
                }
            },
            error => this.tService.handleError(error));
  }

  // Sorting
  key: string = 'Active'; //set default
  reverse: boolean = false;

  // Sorting method
  sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
  }
}
