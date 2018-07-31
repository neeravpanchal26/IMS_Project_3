import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { iUpdate, UserPasswordResetService} from "./user-password-reset.service";
import { GlobalService} from "../../globalAssets/global.service";
import { FormGroup, FormBuilder, Validators, Form, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.css'],
    providers:[UserPasswordResetService]
})
export class UserPasswordResetComponent implements OnInit {
  // Global Variable
  public oldPword:boolean = false;
  public result:boolean;
  public passwordForm:FormGroup;
  public myColors = ['#ff0000', '#ffff00', '#00ff00', '#00ff00', '#00ff00'];

  // Default Constructor
  constructor(private login:LoginService,
              private service:UserPasswordResetService,
              private gService:GlobalService,
              private formBUilder:FormBuilder) { }

  // Form Load
  ngOnInit() {
  }

  // Change password method
  changePassword(e) {
      let param:iUpdate = {userID:this.login.getUserID(), password:e.target.elements[1].value};
      this.service.updatePassword(param)
          .subscribe(
              data => {
                  if(data==true) {
                      this.gService.userPasswordResetSuccess();
                  } else {
                      this.result = false;}
                      },
              error=> this.gService.handleError(error));
  }

  // Old password check method
  oldPassword(e){
      this.service.oldPasswordCheck(this.login.getUserID(),e)
          .subscribe (
              data=> {
                  let r = data[0];
                  if(r['result'] == 1) {
                      this.oldPword = true;
                  }
                  else
                      this.oldPword = false;
              },
              error=> this.gService.handleError(error));
    }

  // Form Builder
  buildForm():void {
      this.passwordForm = this.formBUilder.group({
          'oldPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
          'passwords':this.formBUilder.group({
          'newPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])],
          'cNewPassword':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])]},{validator:this.passwordConfirming})
      });
  }

  // Password Validator
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('password').value !== c.get('confirm_password').value) {
          return {invalid: true};
      }
  }
}
