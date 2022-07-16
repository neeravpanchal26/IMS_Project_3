import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";
import { environment} from "../../../environments/environment";

@Injectable()
export class BusinessSettingService {
  // Global variables
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // upload image
  uploadImage(param:FormData):Observable<any> {
      return this.http.post(this.apiUrl+'/api/BLL/business.php?action=logoUpload',param) as Observable<any>;
  }
  // Business Update info
  updateInfo(param:iBusinesss):Observable<any> {
      return this.http.post(this.apiUrl+'/api/BLL/business.php?action=update',param) as Observable<any>;
  }
  // uploadPdf
  uploadGroupPolicy(param:FormData):Observable<any> {
      return this.http.post(this.apiUrl+'/api/BLL/business.php?action=pdfUpload',param) as Observable<any>;
  }
}
// Wrapper Classes
export interface iBusinesss {
    name:any,
    contact:string,
    email:any
}
