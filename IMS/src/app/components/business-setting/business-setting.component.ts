import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService} from "../../globalAssets/global.service";
import { BusinessFooterService} from "../business-footer/business-footer.service";
import { BusinessSettingService, iBusinesss} from "./business-setting.service";
import { FormGroup, FormBuilder, Validators, Form, FormControl} from '@angular/forms';

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

  // Native Html Elements
  @ViewChild ('BusinessLogo') newBusinessLogo;
  @ViewChild ('BusinessGroupPolicy') newGroupPolicy;

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
      this.logo();

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

  // logo
  logo() {
      this.gService.getLogo()
          .subscribe(
              data => this.businessLogo = this.gService.selectPhoto(data),
              error => this.gService.handleError(error));
  }

  // Business info update
  onSubmit(e) {
    if(e.valid) {
        try {
            // File validation
            let image = this.newBusinessLogo.nativeElement;
            let logoFile = image.files[0];
            let allowedImages = ['image/jpg','image/png'];
            if(allowedImages.indexOf(logoFile.type) >-1) {
                // Logo upload
                let frmData = new FormData();
                frmData.append('file', logoFile);
                this.service.uploadImage(frmData)
                    .subscribe(data => {
                        this.logo();
                    });
            }
            else
                this.businessForm.controls['logo'].setErrors({'incorrect':true});
        } catch {}

        try {
            let pdf = this.newGroupPolicy.nativeElement;
            let groupPolicy = pdf.files[0];
            let allowedPdf = ['application/pdf'];
            if(allowedPdf.indexOf(groupPolicy.type) >-1){
                // Group Policy upload
                let frmData = new FormData();
                frmData.append('file',groupPolicy);
                this.service.uploadGroupPolicy(frmData)
                    .subscribe();
            }
            else
                this.businessForm.controls['pdf'].setErrors({'incorrect':true});
        } catch {}

        // Business Information Update
        let param: iBusinesss = {
            name: e.value['name'],
            contact: e.value['contact'],
            email: e.value['email']
        };
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

  // Form Builder
  buildForm():void {
      let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
      this.businessForm = this.formBuilder.group({
          'logo':[''],
          'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
          'contact':['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
          'email':['',Validators.compose([Validators.required,Validators.pattern(emailPattern),Validators.maxLength(45)])],
          'pdf':['']
      });
  }
}