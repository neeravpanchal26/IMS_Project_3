import { Component, OnInit } from '@angular/core';
import {DeactivateUserService, iUserType} from "./deactivate-user.service";

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

}
