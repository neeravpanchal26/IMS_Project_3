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

  // Equipment Received graph
  getEquipment(days):Observable<any> {
    return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=equipment&days='+days) as Observable<any>;
  }

  // Equipment Extras
  getEquipmentExtras(days):Observable<any> {
      return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=equipmentExtras&days='+days) as Observable<any>;
  }

  // Equipment User
  getEquipmentUser(userID, days):Observable<any> {
    return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=equipmentUser&userID='+userID+'&days='+days) as Observable<any>;
  }

  // Equipment History User
  getEquipmentHistoryUser(userID, days):Observable<any> {
    return this.http.get(this.apiUrl+'/api/BLL/dashboard.php?action=equipmentHistoryUser&userID='+userID+'&days='+days) as Observable<any>;
  }
}
