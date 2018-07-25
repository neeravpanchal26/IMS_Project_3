import { Component, OnInit } from '@angular/core';
import { LoginService} from "../login/login.service";
import { iUpdate, UserPasswordResetService} from "./user-password-reset.service";
import { GlobalService} from "../../globalAssets/global.service";

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

  // Default Constructor
  constructor(private login:LoginService,
              private service:UserPasswordResetService,
              private gService:GlobalService) { }

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
}
