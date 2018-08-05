import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import { environment} from "../../../environments/environment";

@Injectable()
export class UserPasswordResetService {
  // Global variables
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Old Password Check
  oldPasswordCheck(userid,password):Observable<any[]> {
    return this.http.get(this.apiUrl+'/api/BLL/userPasswordReset.php?action=oldPassword&userID='+userid+'&password='+password) as Observable<any[]>;
  }
  // Update Password
  updatePassword(param:iUpdate):Observable<any> {
    return this.http.post(this.apiUrl+'/api/BLL/userPasswordReset.php?action=update',param) as Observable<any>;
  }

}
// Wrapper Class
export interface iUpdate {
    userID:any,
    password:any
}