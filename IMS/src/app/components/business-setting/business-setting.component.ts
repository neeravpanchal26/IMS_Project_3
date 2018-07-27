import { Component, OnInit } from '@angular/core';
import { GlobalService} from "../../globalAssets/global.service";
import { BusinessFooterService} from "../business-footer/business-footer.service";
import { BusinessSettingService, iBusinesss} from "./business-setting.service";

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
    let param: iBusinesss = {
      name:e.target.elements[1].value,
        contact:e.target.elements[2].value,
        email:e.target.elements[3].value
    }
    this.service.updateInfo(param)
        .subscribe(
            data => {
              if(data == true) {
                this.gService.businessUpdateSuccess();
              }
            },
            error => this.gService.handleError(error));
  }

  // Image upload
  imageUpload(e) {
      console.log(e.target.files[0]);
      let frmData = new FormData();
      frmData.append('file',e.target.files[0]);
      this.service.uploadImage(frmData)
          .subscribe();
  }
}
