import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AddUserService {

  constructor(private http:HttpClient) { }
  // Insert Method
  createUser(param:iAddUser):Observable<any> {
    return this.http.post('/api/BLL/addUser.php?action=insert',param) as Observable<any>;
  }
  getSuburb(param:iSuburb):Observable<any> {
    return this.http.post('/api/BLL/addUser.php?action=suburb',param) as Observable<any>;
  }
  getCity():Observable<any> {
    return this.http.get('/api/BLL/addUser.php?action=city') as Observable<any>;
  }
  getUserType():Observable<any> {
    return this.http.get('api/BLL/addUser.php?action=userType') as Observable<any>;
  }
}
// Wrapper Class
export interface iAddUser {
    firstName: string,
    lastName: string,
    dob: string,
    contactNumber: string,
    email: string,
    password: string,
    userType: string,
    address1: string,
    address2: string,
    suburb: string
}
export interface iSuburb {
    city:any
}