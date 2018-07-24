import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BusinessSettingService {
  // Default Constructor
  constructor(private http:HttpClient) { }

  //upload image
  uploadImage(param:iImage):Observable<any> {
    return this.http.post('/api/BLL/imageUpload.php',param,{responseType:'blob'}) as Observable<any>;
  }

}
// Wrapper Classes
export interface iImage {
    image:any
}
