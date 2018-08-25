import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class CityService {
    //  Global Variables
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Add City
    addCity(param: iCity): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/secondaryComponents.php?action=addCity', param) as Observable<any>;
    }
}

// Wrapper Classes
export interface iCity {
    name: any
}
