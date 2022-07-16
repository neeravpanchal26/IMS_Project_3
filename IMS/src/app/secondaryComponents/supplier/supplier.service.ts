import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SupplierService {
  // Global Variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // Add Supplier
  addSupplier(param:iSupplier):Observable<any> {
    return this.http.post(this.apiUrl+'/api/BLL/secondaryComponents.php?action=addSupplier',param) as Observable<any>;
  }
}
// Wrapper Classes
export interface iSupplier {
    name:any,
    number:any,
    email:any
}