import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AllocateEquipmentService {

  constructor(private http:HttpClient) { }
  apiURL=environment.api;
  getUnnassignedEquipment():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/bll/allocateEquipment.php?action=unassigned') as Observable<any>;
  }
  getTechEmployees():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/bll/allocateEquipment.php?action=techEmployees')as Observable<any>;
  }
  getUserEquipment(param:iUser):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/bll/allocateEquipment.php?action=userequipment',param)as Observable<any>;
  }
  allocateEquipment(param:iAllocation):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/bll/allocateEquipment.php?action=allocate',param) as Observable<any>;
  }
  
}
export interface iUser {
  id:any
}
export interface iAllocation
{
  condition:any,
  value:any,
  equipmentID:any,
  userID:any,
}
