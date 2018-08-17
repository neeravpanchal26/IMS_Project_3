import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ImageRetrieveService} from "../../globalServices/image-retrieve.service";

@Injectable()
export class AllocateEquipmentService {

  constructor(private http:HttpClient,
              private iService:ImageRetrieveService) { }
  apiURL=environment.api;
  getEquipmentDetails(param:iEquipment):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/bll/allocateEquipment.php?action=info',param) as Observable<any>;
  }
  getTechEmployees():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/bll/allocateEquipment.php?action=techEmployees')as Observable<any>;
  }
  allocateEquipment(param:iAllocation):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/bll/allocateEquipment.php?action=allocate',param) as Observable<any>;
  }
  getEquipmentPicture(param:iEquipment):Observable<Blob>
  {
    return this.http.post(this.apiURL+'/api/bll/allocateEquipment.php?action=image',param,{responseType:'blob'})as Observable<Blob>;
  }
  sanitizeEquipmentPicture(photo)
  {
    return this.iService.selectPhoto(photo);
  }
}
export interface iUser {
  id:any
}
export interface iEquipment
{
  id:any
}
export interface iAllocation
{
  condition:any,
  value:any,
  equipmentID:any,
  userID:any,
}
