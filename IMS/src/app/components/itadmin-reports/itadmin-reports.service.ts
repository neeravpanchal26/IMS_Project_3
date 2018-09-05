import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ItadminReportsService {
    // Global Variables
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // It Admin users
    getItAdminUsers(type,city,suburb): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=ItAdminUsers&cityID='+city+'&typeID='+type+'&suburbID='+suburb) as Observable<any>;
    }

    // Get user types
    getUserType(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addUser.php?action=userType') as Observable<any>;
    }

    // Get City
    getCity(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addUser.php?action=city') as Observable<any>;
    }

    // Get all suburbs
    getAllSuburb(): Observable<any[]> {
        return this.http.get(this.apiUrl + '/api/BLL/userSetting.php?action=suburb') as Observable<any[]>;
    }
}
