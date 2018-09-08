import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment} from "../../../environments/environment";

@Injectable()
export class TechManageEquipmentService {
    apiURL=environment.api;
  constructor(private http:HttpClient) { }
  getInfo(param):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/bll/techManageEquipment.php?action=getInfo',param);
  }

}
export interface iUserID
{
    id:any,
    sDate:any,
    eDate:any
}