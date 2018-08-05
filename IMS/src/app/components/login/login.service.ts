import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import { environment} from "../../../environments/environment";

@Injectable()
export class LoginService {
  // Global Variable
  private isLoggedIn;
  private userType;
  private username;
  private userID;
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) {
    this.isLoggedIn=false;
  }

  //Set user logged in
  setUserLoggedIn(type,info,id) {
    this.isLoggedIn = true;
    this.userType = type;
    this.username = info;
    this.userID = id;
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

  // Get userID
  getUserID()
  {
    return this.userID;
  }

  // Login Check Service
  check(param:iLogin):Observable<any> {
      return this.http.post(this.apiUrl+'/api/BLL/login.php',param) as Observable<any>;
  }
}
// Wrapper Class
export interface iLogin {
    username: any,
    password: any
}
