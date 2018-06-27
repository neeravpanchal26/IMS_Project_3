import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddEquipmentService {

  constructor(private http:HttpClient) { }


  GetBrands():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=brand')as Observable<any>;
  }
  GetStatus():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=status')as Observable<any>;
  }
  GetUsers():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=users')as Observable<any>;
  }
  GetTypes():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=types')as Observable<any>;
  }
  GetConditions():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=condition')as Observable<any>;
  }
  GetSections():Observable<any>
  {
    return this.http.get('/api/BLL/addEquipment.php?action=section') as Observable<any>;
  }
  AddEquipment(param:iAddEquipment):Observable<any>
  {
    return this.http.post('',param)as Observable<any>;
  }
}
export interface iAddEquipment
{
  equipmentID:any, name:any,desc:any,locationGps:any,locationPerson:any,cost:any,equipmentCondition:any,
  brand:any,section:any,type:any,status:any,conditionPic:any,dateReceived:any
}
