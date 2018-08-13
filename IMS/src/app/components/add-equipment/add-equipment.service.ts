import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment} from "../../../environments/environment";

@Injectable()
export class AddEquipmentService {

  constructor(private http:HttpClient) { }
  apiURL = environment.api;

  GetBrands():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=brand')as Observable<any>;
  }
  GetStatus():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=status')as Observable<any>;
  }
  //GetUsers():Observable<any>
  //{
  //  return this.http.get('/api/BLL/addEquipment.php?action=users')as Observable<any>;
 // }
  GetTypes():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=types')as Observable<any>;
  }
  GetConditions():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=condition')as Observable<any>;
  }
  GetSections():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=section') as Observable<any>;
  }
  GetSuppliers():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/addEquipment.php?action=suppliers') as Observable<any>;
  }
  AddEquipment(param:iAddEquipment):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/BLL/addEquipment.php?action=insert',param)as Observable<any>;
  }
  uploadImage(param:FormData):Observable<any> {
    return this.http.post(this.apiURL+'/api/BLL/addEquipment.php?action=imageUpload',param) as Observable<any>;
  }
}
export interface iAddEquipment
{
  name: any, desc: any,  cost: any, equipmentCondition: any,
  brand: any, section: any, type: any,  dateReceived: any, barcode:any, supplier:any
}

