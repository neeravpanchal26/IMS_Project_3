import { Component, OnInit } from '@angular/core';
import { HeaderService } from "../header/header.service";
import {GlobalService} from "../../globalAssets/global.service";

@Component({
  selector: 'app-business-setting',
  templateUrl: './business-setting.component.html',
  styleUrls: ['./business-setting.component.css'],
    providers:[HeaderService]
})
export class BusinessSettingComponent implements OnInit {
  // Global Variables
  public businessLogo:any;

  // Default Constructor
  constructor(private header:HeaderService,
              private gService:GlobalService) { }

  // Form Load
  ngOnInit() {
      // Load Logo
      this.gService.getLogo()
          .subscribe(
              data => this.businessLogo = this.gService.selectPhoto(data),
              error => this.gService.handleError(error));
  }

  // Business info update
  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements[0].files[0]);
  }

}
