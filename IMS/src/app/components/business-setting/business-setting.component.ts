import { Component, OnInit } from '@angular/core';
import { HeaderService } from "../header/header.service";
import {handleError} from "../error/error";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-business-setting',
  templateUrl: './business-setting.component.html',
  styleUrls: ['./business-setting.component.css'],
    providers:[HeaderService]
})
export class BusinessSettingComponent implements OnInit {
  // Global Variables
  public businessLogo:Blob;

  // Default Constructor
  constructor(private header:HeaderService,
              private toastr:ToastrService) { }

  // Form Load
  ngOnInit() {
    // Load logo
      this.header.getLogo()
          .subscribe(
              data => this.businessLogo = data,
              error=>this.toastr.error(handleError(error),'Oops!'))
  }

}
