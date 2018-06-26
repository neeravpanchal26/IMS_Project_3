import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {iUpdate, UserPasswordResetService} from "./user-password-reset.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  constructor(private login:LoginService,private service:UserPasswordResetService) { }

  ngOnInit() {
  }

  changePassword(e) {
      let param:iUpdate = {userID:this.login.getUserID(), password:e.target.elements[1].value};
      this.service.updatePassword(param).subscribe(data => {if(data==true) {this.result = true;} else {this.result = false;}});
  }
  oldPassword(e){
      this.service.oldPasswordCheck(this.login.getUserID(),e)
          .subscribe (
              data=> {
                  let r = data[0];
                  if(r['result'] == 1)
                      this.oldPword = true;
                  else
                      this.oldPword = false;
              }
              );
    }
}
