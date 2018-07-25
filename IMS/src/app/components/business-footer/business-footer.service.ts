import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BusinessFooterService {
  // Default Constructor
  constructor(private http:HttpClient) { }

  // Business info load
  getBusinessInfo():Observable<any> {
    return this.http.get('/api/BLL/business.php?action=info') as Observable <any>;
  }

}
