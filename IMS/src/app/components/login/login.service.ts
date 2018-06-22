import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {
    // Global variable
    private isLoggedIn;

    // Default Constructor
    constructor(private http:HttpClient) {
        this.isLoggedIn = false;
    }

    setUserLoggedIn() {
        this.isLoggedIn = true;
    }

    getUserLoggedIn() {
        return this.isLoggedIn;
    }
    // Login Check Service
    check(param:iLogin):Observable<any> {
    return this.http.post('/api/BLL/login.php',param) as Observable<any>;
    }
}
// Wrapper Class
export interface iLogin {
    username: any,
    password: any
}
