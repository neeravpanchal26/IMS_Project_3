import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable()
export class DashboardService {
  // Global variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Users graph
  getUsers(days):Observable<any[]> {
    return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=users&days='+days) as Observable<any[]>;
  }

  // Individual User graph
  getIndivdualData(userID,days):Observable<any[]>{
    return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=specificUser&userID='+userID+'&days='+days) as Observable<any[]>;
  }
}
