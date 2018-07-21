import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Global Declaration
  public userType;
  public userName;

  // Default Constructor
  constructor(private service:LoginService) { }

  // Page Load
  ngOnInit() {
      this.userType = this.service.getUserType();
      this.userName = this.service.getUserName();
  }
}
