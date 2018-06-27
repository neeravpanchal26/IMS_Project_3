import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/do';

@Injectable()
export class UserSettingService {
    // Default constructor
    constructor(private http:HttpClient) { }

    // Get Specific user info
    getSpecificUser(SpecificUser): Observable<any[]> {
        return this.http.get('/api/BLL/userSetting.php?action=specificUser&userID='+SpecificUser)as Observable<any[]>;
    }
    // Get all suburbs
    getAllSuburb():Observable<any[]> {
        return this.http.get('/api/BLL/userSetting.php?action=suburb') as Observable<any[]>;
    }

    // Update user info
    updateUserInfo(param:iUpdateUserInfo):Observable<any> {
        return this.http.post('/api/BLL/userSetting.php?action=update',param) as Observable<any>;
    }
}
// Wrapper interface
export interface iUpdateUserInfo {
    userID:any,
    firstName:any,
    lastName:any,
    dob:any,
    contactNumber:any,
    email:any,
    address1:any,
    address2:any,
    suburb:any
}