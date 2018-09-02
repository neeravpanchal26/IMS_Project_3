import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ImageRetrieveService } from '../../globalServices/image-retrieve.service';

@Injectable()
export class UpdateEquipmentService {

  constructor(private http:HttpClient, private iService:ImageRetrieveService) { }
  apiURL = environment.api;
  getEquipmentDetails(param:iGetEquipmentDetails)
  {
    return this.http.post(this.apiURL+'/api/BLL/updateEquipment.php?action=getEquipmentDetails', param) as Observable<any>;
  }
  UpdateEquipment(param)
  {
    return this.http.post(this.apiURL+'/api/BLL/updateEquipment.php?action=updateEquipment',param);
  }
  GetBrands():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/updateEquipment.php?action=brand')as Observable<any>;
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
  sanitizeEquipmentPicture(photo)
  {
    return this.iService.selectPhoto(photo);
  }
}
export interface iGetEquipmentDetails
{
  id:any
}
export interface iUpdateEquipment
{
  id:any,name:any, desc:any, brand:any, section:any, type:any,  supplier:any
}