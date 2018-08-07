import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UpdateEquipmentService {

  constructor(private http:HttpClient) { }
  apiURL = environment.api;
  getEquipmentDetails(param:iGetEquipmentDetails)
  {
    return this.http.post(this.apiURL+'/api/bll/updateEquipment.php?action=getEquipmentDetails', param) as Observable<any>;
  }
  GetBrands():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=brand')as Observable<any>;
  }
  GetStatus():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=status')as Observable<any>;
  }
  GetTypes():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=types')as Observable<any>;
  }
  GetConditions():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=condition')as Observable<any>;
  }
  GetSections():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=section') as Observable<any>;
  }
  GetSuppliers():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=suppliers') as Observable<any>;
  }
}
export interface iGetEquipmentDetails
{
  id:any
}