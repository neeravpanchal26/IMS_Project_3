import { Component, OnInit} from '@angular/core';
import { LoginService} from "../login/login.service";
import { HeaderService} from "./header.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { ImageRetrieveService} from "../../globalServices/image-retrieve.service";


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
              private tService:ToastrNotificationService,
              private iService:ImageRetrieveService) { }

  // Page Load
  ngOnInit() {
      // Get user type
      this.userType = this.service.getUserType();

      // Get username
      this.userName = this.service.getUserName();

      // Load Logo
      this.iService.getLogo()
          .subscribe(
              data => this.businessLogo = this.iService.selectPhoto(data),
              error => this.tService.handleError(error));
  }
}
