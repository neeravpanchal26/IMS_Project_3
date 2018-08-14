import { Component, OnInit } from '@angular/core';
import { ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  // Global variable
  public businessLogo:any;

  // Default Constructor
  constructor(private iService:ImageRetrieveService,
              private tService:ToastrNotificationService) { }

  // Form load
  ngOnInit() {
      // Load Logo
      this.iService.getLogo()
          .subscribe(
              data => this.businessLogo = this.iService.selectPhoto(data),
              error => this.tService.handleError(error));
  }

}
