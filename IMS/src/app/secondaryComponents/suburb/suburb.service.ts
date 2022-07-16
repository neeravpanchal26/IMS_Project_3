import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SuburbService {
    // Global Variable
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http:HttpClient) {
    }

    // Add Suburb
    addSuburb(param:iSuburb): Observable<any> {
        return this.http.post(this.apiUrl+'/api/BLL/secondaryComponents.php?action=addSuburb',param) as Observable<any>;
    }
}
// Wrapper Classes
export interface iSuburb {
    cityID: any,
    suburbName: any
}