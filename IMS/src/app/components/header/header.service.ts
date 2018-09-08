import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class HeaderService {
    // Global Variable
    private username;
    public apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // set username
    setUserName(info) {
        this.username = info;
    }

    // get username
    getUserName() {
        return this.username;
    }

    // Get Policy
    getPolicy(): Observable<Blob> {
        return this.http.get(this.apiUrl+'/api/BLL/business.php?action=groupPolicyDownload',{responseType: 'blob'}) as Observable<Blob>;
    }
}
