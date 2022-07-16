import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SectionService {
    // Global Variable
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {}

    // Add Section
    addSection(param:iSection): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/secondaryComponents.php?action=addSection', param) as Observable<any>;
    }
}

// Wrapper classes
export interface iSection {
    name: any
}
