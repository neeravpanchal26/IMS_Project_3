import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";

@Injectable()
export class DeactivateUserService {
  // Default Constructor
  constructor(private http:HttpClient) { }

  // Get Users
  getUsers(ID):Observable<any[]> {
    return this.http.get('/api/BLL/voidUser.php?action=users&userID='+ID) as Observable<any[]>;
  }

  // Update user status
  updateStatus(param:iUser) {
    return this.http.post('/api/BLL/voidUser.php?action=update',param)as Observable<any>;
  }

  // Update user type
  updateType(param:iUser){
    return this.http.post('/api/BLL/voidUser.php?action=type',param) as Observable<any>;
  }
}
export interface iUser {
    UserID:any,
    Status:any
}
