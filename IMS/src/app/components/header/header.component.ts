import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { HeaderService} from "./header.service";
import { handleError} from "../error/error";
import { ToastrService} from "ngx-toastr";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    providers:[HeaderService]
})
export class HeaderComponent implements OnInit {
  // Global Declaration
  public userType;
  public userName;
  public businessLogo:any;

  // Default Constructor
  constructor(private service:LoginService,
              private header:HeaderService,
              private toastr:ToastrService,
              public sanitizer:DomSanitizer) { }

  // Page Load
  ngOnInit() {
      this.userType = this.service.getUserType();
      this.userName = this.service.getUserName();
      this.header.getLogo()
          .subscribe(
              data => this.businessLogo = data,
              error => this.toastr.error(handleError(error),'Oops!'));
  }
}
