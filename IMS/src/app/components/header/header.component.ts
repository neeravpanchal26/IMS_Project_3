import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Global Declaration
  public iT = [
      {'path': '/Add User', 'name': 'Add User','icon':'person'},
      {'path': '/Remove User', 'name': 'Update User','icon':'person'},
      {'path': '/Reset password','name':'Reset Password','icon':'key'}
      ];

  public tE = [
      {'path': '/Add Equipment', 'name': 'Add Equipment','icon':'cart'},
      {'path': '/Allocate Equipment', 'name': 'Allocate Equipment','icon':'cart'},
      {'path': '/Locate Equipment', 'name': 'Locate Equipment','icon':'cart'}
      ];

  public sH = [
      {'path': '/Void Equipment', 'name': 'Dispose Equipment','icon':'cart'}
      ];
  public dash = [{'path': '/dashboard', 'name': 'Dashboard','icon':'home'}];
  public report = [{'path': '/reports', 'name': 'Reports','icon':'script'}];

  public router = [];
  public userType;
  public userName;

  // Default Constructor
  constructor(private service:LoginService) { }

  // Page Load
  ngOnInit() {
      this.userType = this.service.getUserType();
      this.userName = this.service.getUserName();
    if (this.userType === 1) {
      this.router = this.dash.concat(this.iT.concat(this.report));
    } else if (this.userType === 2) {
      this.router = this.dash.concat(this.tE.concat(this.report));
    } else if (this.userType === 3) {
      this.router = this.dash.concat(this.tE.concat(this.sH.concat(this.report)));
    }
  }
}
