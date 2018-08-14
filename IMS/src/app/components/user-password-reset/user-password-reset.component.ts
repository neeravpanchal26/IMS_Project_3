import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { iUpdate, UserPasswordResetService} from "./user-password-reset.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { FormGroup, FormBuilder, Validators, Form, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.css'],
    providers:[UserPasswordResetService]
})
export class UserPasswordResetComponent implements OnInit {
  // Global Variable
  public passwordForm:FormGroup;
  public myColors = ['#ff0000', '#ffff00', '#00ff00', '#00ff00', '#00ff00'];
  public Labels = ['Weak', 'Fair', 'Good', 'Strong', 'Great'];

  // Default Constructor
  constructor(private login:LoginService,
              private service:UserPasswordResetService,
              private tService:ToastrNotificationService,
              private formBuilder:FormBuilder) { }

  // Form Load
  ngOnInit() {
      // Form Validation
      this.buildForm();
  }

  // Old password check method
  oldPassword(e){
      this.service.oldPasswordCheck(this.login.getUserID(),e.value['oldPassword'])
          .subscribe (
              data=> {
                  let r =data[0];
                  if(r['result'] == 1) {
                      this.changePassword(e);
                  }
                  else if(r['result'] == 0){
                      this.passwordForm.controls['oldPassword'].setErrors({'incorrect': true});
                  }},
                error=> this.tService.handleError(error));
  }

  // Change password method
  changePassword(e) {
      if(e.valid) {
          let param: iUpdate = {
              userID: this.login.getUserID(),
              password: e.value['passwords']['cNewPassword']
          };
          this.service.updatePassword(param)
              .subscribe(
                  data => {
                      if (data == true) {
                          this.tService.userPasswordResetSuccess();
                          e.reset();
                      }
                  },
                  error => this.tService.handleError(error));
      }
      if(e.invalid)
          this.tService.formFailure();
  }

  // Form Builder
  buildForm():void {
      this.passwordForm = this.formBuilder.group({
          'oldPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
          'passwords':this.formBuilder.group({
          'newPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
          'cNewPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])]},{validator:this.passwordConfirming})
      });
  }

  // Password Validator
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('newPassword').value !== c.get('cNewPassword').value) {
          return {invalid: true};
      }
  }
}
