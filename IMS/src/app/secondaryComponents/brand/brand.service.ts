import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BrandService {
  // Global Variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Add Brand
  addBrand(param:iBrand): Observable<any> {
    return this.http.post(this.apiUrl+'/api/BLL/secondaryComponents.php?action=addBrand',param) as Observable<any>;
  }

}
// Wrapper Classes
export interface iBrand {
    name:any
}
