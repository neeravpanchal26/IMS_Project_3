import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TypeService {
    // Global Variable
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Add Type
    addType(param: iType): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/secondaryComponents.php?action=addType', param) as Observable<any>;
    }
}

// Wrapper Classes
export interface iType {
    name: any
}
