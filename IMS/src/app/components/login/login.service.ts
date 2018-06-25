import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {
  // Global Variable
  private isLoggedIn;
  private userType;
  private username;

  // Default Constructor
  constructor(private http:HttpClient) {
    this.isLoggedIn=false;
  }

  //Set user logged in
  setUserLoggedIn(type,info) {
    this.isLoggedIn = true;
    this.userType = type;
    this.username = info;
  }

  // Get user logged in
  getUserLoggedIn() {
    return this.isLoggedIn;
  }

  // Get user type
  getUserType() {
    return this.userType;
  }

  // get username
  getUserName() {
    return this.username;
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
