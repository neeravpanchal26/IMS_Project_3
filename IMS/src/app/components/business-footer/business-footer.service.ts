import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import { environment} from "../../../environments/environment";

@Injectable()
export class BusinessFooterService {
  // Global Variables
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Business info load
  getBusinessInfo():Observable<any> {
    return this.http.get(this.apiUrl+'/api/BLL/business.php?action=info') as Observable <any>;
  }

}
