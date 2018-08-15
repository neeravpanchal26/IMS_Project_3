import { Component, OnInit } from '@angular/core';
import { ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { Location} from "@angular/common";

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
              private tService:ToastrNotificationService,
              private location:Location) { }

  // Form load
  ngOnInit() {
      // Load Logo
      this.iService.getLogo()
          .subscribe(
              data => this.businessLogo = this.iService.selectPhoto(data),
              error => this.tService.handleError(error));
  }

  // Locate Back
  locateBack() {
    this.location.back();
  }

}
