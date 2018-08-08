import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { iUpdate, UserPasswordResetService} from "../user-password-reset/user-password-reset.service";
import { UserSettingService} from "../user-setting/user-setting.service";
import { GlobalService} from "../../globalAssets/global.service";
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import * as $ from 'jquery/dist/jquery.js';

@Component({
  selector: 'app-it-password-reset',
  templateUrl: './it-password-reset.component.html',
  styleUrls: ['./it-password-reset.component.css'],
    providers:[UserPasswordResetService,UserSettingService]
})
export class ItPasswordResetComponent implements OnInit {
    // Global variable
    public userID:number;
    public userInfo:any = [];
    public resetForm:FormGroup;
    public myColors = ['#ff0000', '#ffff00', '#00ff00', '#00ff00', '#00ff00'];
    public Labels = ['Weak', 'Fair', 'Good', 'Strong', 'Great'];

    // Default Constructor
    constructor(private user:UserPasswordResetService,
                private route:ActivatedRoute,
                private setting:UserSettingService,
                private gService:GlobalService,
                private formBuilder:FormBuilder) { }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();

        // Set User ID
        this.userID = parseInt(this.route.snapshot.paramMap.get('id'));

        // Get specific user by ID
        this.setting.getSpecificUser(this.userID)
            .subscribe(
                data => this.userInfo = data[0],
                error=> this.gService.handleError(error));
    }

    // Reset password method
    password(e) {
      if(e.valid) {
          let param: iUpdate = {userID: this.userID, password: e.value['password']};
          this.user.updatePassword(param)
              .subscribe(
                  data => {
                      if (data == true) {
                          this.gService.passwordResetSuccess(this.userInfo['FirstName'], this.userInfo['Surname']);
                          $('#exampleModalCenter').modal('toggle');
                      }
                  },
                  error => this.gService.handleError(error));
      }
      if(e.invalid)
            this.gService.formFailure();
    }

    // Form Builder
    buildForm():void {
        this.resetForm = this.formBuilder.group({
            'password':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])]
        });
    }
}