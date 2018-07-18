import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DashboardService {
  // Default Constructor
  constructor(private http:HttpClient) { }

  // Users graph
  getUsers():Observable<any[]> {
    return this.http.get('/api/BLL/dashboard.php?action=users') as Observable<any[]>;
  }

  // Individual User graph
  getIndivdualData(userID):Observable<any[]>{
    return this.http.get('/api/BLL/dashboard.php?action=specificUser&userID='+userID) as Observable<any[]>;
  }
}
