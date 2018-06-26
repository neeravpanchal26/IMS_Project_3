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
}