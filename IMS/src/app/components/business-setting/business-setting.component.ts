import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../globalAssets/global.service";
import {BusinessFooterService} from "../business-footer/business-footer.service";
import {BusinessSettingService, iImage} from "./business-setting.service";

@Component({
  selector: 'app-business-setting',
  templateUrl: './business-setting.component.html',
  styleUrls: ['./business-setting.component.css'],
    providers:[BusinessFooterService,BusinessSettingService]
})
export class BusinessSettingComponent implements OnInit {
  // Global Variables
  public businessLogo:any;
  public business:any = [];

  // Default Constructor
  constructor(private gService:GlobalService,
              private bFooter:BusinessFooterService,
              private service:BusinessSettingService) { }

  // Form Load
  ngOnInit() {
      // Load Logo
      this.gService.getLogo()
          .subscribe(
              data => this.businessLogo = this.gService.selectPhoto(data),
              error => this.gService.handleError(error));

      // Load Business info
      this.bFooter.getBusinessInfo()
          .subscribe(
              data => this.business = data[0],
              error => this.gService.handleError(error));
  }

  // Business info update
  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements[0].files[0]);
    console.log(window.URL.createObjectURL(e.target.elements[0].files[0]));
    let param:iImage = {
      image:window.URL.createObjectURL(e.target.elements[0].files[0])
    };
    this.service.uploadImage(param)
        .subscribe();
    console.log(e.target.elements);
  }

}
