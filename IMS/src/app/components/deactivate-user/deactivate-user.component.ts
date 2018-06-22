import { Component, OnInit } from '@angular/core';
import {DeactivateUserService, iUser, iUserType} from "./deactivate-user.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.css'],
    providers: [DeactivateUserService]
})
export class DeactivateUserComponent implements OnInit {
  // Global variable
  public userType:any;
  public users:any;
  public selectedStatus:any;
  // Default Constructor
  constructor(private service:DeactivateUserService) { }

  // Form Load
  ngOnInit() {
      // User Type Load up
      this.service.getUserType().subscribe(data => this.userType = data);
  }

  // Users Load up
  userLoad(e) {
    let param: iUserType = {
      Type:e
      };
      this.service.UserByType(param).subscribe(data => this.users = data);
  }

  // Individual Status
  status(e){
      for (let uK of this.users) {
        if(uK['UserID']==e)
        {
          this.selectedStatus=uK['Status'];
        }
      }
  }

  // Update Status
    updateUser(e) {
    let status:any;
    if(e.target.elements[2].checked==true)
    {
      status = 1;
    }
    else if (e.target.elements[2].checked==false)
    {
      status = 0;
    }
    let param: iUser = {
      UserID:e.target.elements[1].value,
        Status:status
    };
    this.service.updateStatus(param).subscribe(data => console.log(data));
    }
}
