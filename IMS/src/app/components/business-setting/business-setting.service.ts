import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";

@Injectable()
export class BusinessSettingService {
  // Default Constructor
  constructor(private http:HttpClient) { }

  //upload image
  uploadImage(param:FormData):Observable<any> {
    return this.http.post('/api/BLL/imageUpload.php',param) as Observable<any>;
  }
  // Business Update info
  updateInfo(param:iBusinesss):Observable<any> {
      return this.http.post('/api/BLL/business.php?action=update',param) as Observable<any>;
  }
}
// Wrapper Classes
export interface iBusinesss {
    name:any,
    contact:any,
    email:any
}
