import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllocateEquipmentService {

  constructor(private http:HttpClient) { }

  getUnnassignedEquipment():Observable<any>
  {
    return this.http.get('/api/bll/allocateEquipment.php?action=unassigned') as Observable<any>;
  }
  getTechEmployees():Observable<any>
  {
    return this.http.get('/api/bll/allocateEquipment.php?action=techEmployees')as Observable<any>;
  }
  getUserEquipment(param:iUser):Observable<any>
  {
    return this.http.post('/api/bll/allocateEquipment.php?action=userequipment',param)as Observable<any>;
  }
  allocateEquipment(param:iAllocation):Observable<any>
  {
    return this.http.post('/api/bll/allocateEquipment.php?action=allocate',param) as Observable<any>;
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
