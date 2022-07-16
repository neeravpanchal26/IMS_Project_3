import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ConditionService {
    // Global Variable
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Add Condition
    addCondition(param: iCondition): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/secondaryComponents.php?action=addCondition', param) as Observable<any>;
    }
}

// Wrapper Classes
export interface iCondition {
    name: any;
}
