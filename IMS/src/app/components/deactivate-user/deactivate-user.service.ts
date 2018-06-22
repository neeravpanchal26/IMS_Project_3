import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";

@Injectable()
export class DeactivateUserService {
  constructor(private http:HttpClient) { }
  UserByType(param:iUserType):Observable<any> {
    return this.http.post('/api/BLL/voidUser.php?action=userByType',param) as Observable<any>;
  }
  getUserType():Observable<any> {
    return this.http.get('/api/BLL/voidUser.php?action=userType') as Observable<any>;
  }
  updateStatus(param:iUser)
  {
    return this.http.post('/api/BLL/voidUser.php?action=update',param)as Observable<any>;
  }
}
export interface iUserType {
  Type:any
}
export interface iUser {
    UserID:any,
    Status:any
}
