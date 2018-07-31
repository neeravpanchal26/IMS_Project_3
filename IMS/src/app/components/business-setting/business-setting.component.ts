import { Component, OnInit } from '@angular/core';
import { GlobalService} from "../../globalAssets/global.service";
import { BusinessFooterService} from "../business-footer/business-footer.service";
import { BusinessSettingService, iBusinesss} from "./business-setting.service";
import {FormGroup, FormBuilder, Validators, Form, FormControl} from '@angular/forms';

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
  public businessForm:FormGroup;

  // Default Constructor
  constructor(private gService:GlobalService,
              private bFooter:BusinessFooterService,
              private service:BusinessSettingService,
              private formBuilder:FormBuilder) { }

  // Form Load
  ngOnInit() {
      // Form Validation
      this.buildForm();

      // Load Logo
      this.gService.getLogo()
          .subscribe(
              data => this.businessLogo = this.gService.selectPhoto(data),
              error => this.gService.handleError(error));

      // Load Business info
      this.bFooter.getBusinessInfo()
          .subscribe(
              data => {
                  // Load values onto form
                  this.businessForm.controls['name'].setValue(data[0].BusinessName);
                  this.businessForm.controls['contact'].setValue(data[0].contact);
                  this.businessForm.controls['email'].setValue(data[0].Email);
                  },
              error => this.gService.handleError(error));
  }

  // Business info update
  onSubmit(e) {
    if(e.valid) {
        let param: iBusinesss = {
            name: e.value['name'],
            contact: e.value['contact'],
            email: e.value['email']
        }
        this.service.updateInfo(param)
            .subscribe(
                data => {
                    if (data == true) {
                        this.gService.businessUpdateSuccess();
                    }
                },
                error => this.gService.handleError(error));
    }
  }

  // upload
  upload(e,type) {
      let file = e.target.files[0];
      if(type == 1) {
          // Logo upload
          let frmData = new FormData();
          frmData.append('file', file);
          this.service.uploadImage(frmData)
              .subscribe();
      }
      else if (type == 2) {
          // Group Policy upload
      }
  }

  // Form Builder
  buildForm():void {
      let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
      this.businessForm = this.formBuilder.group({
          'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
          'contact':['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
          'email':['',Validators.compose([Validators.required,Validators.pattern(emailPattern),Validators.maxLength(45)])],
      });
  }
}
