import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";
import { environment} from "../../../environments/environment";

@Injectable()
export class DeactivateUserService {
  // Global variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Get Users
  getUsers(ID):Observable<any[]> {
    return this.http.get(this.apiUrl+'/api/BLL/voidUser.php?action=users&userID='+ID) as Observable<any[]>;
  }

  // Get Users by name
  getUsersByName(ID,Name):Observable<any[]> {
    return this.http.get(this.apiUrl+'/api/BLL/voidUser.php?action=specificUser&userID='+ID+'&userName='+Name) as Observable<any[]>;
  }

  // Update user status
  updateStatus(param:iUser) {
    return this.http.post(this.apiUrl+'/api/BLL/voidUser.php?action=update',param)as Observable<any>;
  }

  // Update user type
  updateType(param:iUser){
    return this.http.post(this.apiUrl+'/api/BLL/voidUser.php?action=type',param) as Observable<any>;
  }
}
export interface iUser {
    UserID:any,
    Status:any
}
