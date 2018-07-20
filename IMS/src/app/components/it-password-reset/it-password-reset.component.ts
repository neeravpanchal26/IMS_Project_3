import { Component, OnInit } from '@angular/core';
import { DeactivateUserService } from "../deactivate-user/deactivate-user.service";
import { iUpdate, UserPasswordResetService} from "../user-password-reset/user-password-reset.service";

@Component({
  selector: 'app-it-password-reset',
  templateUrl: './it-password-reset.component.html',
  styleUrls: ['./it-password-reset.component.css'],
    providers:[DeactivateUserService,UserPasswordResetService]
})
export class ItPasswordResetComponent implements OnInit {
    // Global variable
    public userType:any;
    public users:any;
    public result:boolean;

    // Default Constructor
    constructor(private service:DeactivateUserService,private user:UserPasswordResetService) { }

    // Form Load
    ngOnInit() {
        // User Type Load up
        //this.service.getUserType().subscribe(data => this.userType = data);
    }

    // Users Load up
    userLoad(e) {
        //let param: iUserType = {Type:e};
        //this.service.UserByType(param).subscribe(data => this.users = data);
    }
    password(e) {
      let param:iUpdate = { userID:e.target.elements[1].value, password:e.target.elements[2].value};
      this.user.updatePassword(param).subscribe(data=> {if(data==true){this.result=true}else{this.result=false}});
    }
}
