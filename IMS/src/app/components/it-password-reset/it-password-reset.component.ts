import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { iUpdate, UserPasswordResetService} from "../user-password-reset/user-password-reset.service";
import { UserSettingService} from "../user-setting/user-setting.service";
import { GlobalService} from "../../globalAssets/global.service";

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

    // Default Constructor
    constructor(private user:UserPasswordResetService,
                private route:ActivatedRoute,
                private setting:UserSettingService,
                private gService:GlobalService) { }

    // Form Load
    ngOnInit() {
        this.userID = parseInt(this.route.snapshot.paramMap.get('id'));
        this.setting.getSpecificUser(this.userID)
            .subscribe(
                data => this.userInfo = data[0],
                error=> this.gService.handleError(error));
    }

    // Reset password method
    password(e) {
      e.preventDefault();
      let param:iUpdate = { userID:this.userID, password:e.target.elements[0].value};
      this.user.updatePassword(param)
          .subscribe(
          data=> {
              if(data == true) {
                  this.gService.passwordResetSuccess(this.userInfo['FirstName'],this.userInfo['Surname']);
              }
          },
          error => this.gService.handleError(error));
    }
}