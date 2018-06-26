import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserPasswordResetService {

  constructor(private http:HttpClient) { }

  // Old Password Check
  oldPasswordCheck(userid,password):Observable<any[]> {
    return this.http.get('/api/BLL/userPasswordReset.php?action=oldPassword&userID='+userid+'&password='+password) as Observable<any[]>;
  }
  // Update Password
  updatePassword(param:iUpdate):Observable<any> {
    return this.http.post('/api/BLL/userPasswordReset.php?action=update',param) as Observable<any>;
  }

}
// Wrapper Class
export interface iUpdate {
    userID:any,
    password:any
}