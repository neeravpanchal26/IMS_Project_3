import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment} from "../../../environments/environment";

@Injectable()
export class ManageEquipmentService {
    apiURL=environment.api;
  constructor(private http:HttpClient) { }


  GetEquipmentInfo():Observable<any>
  {
    return this.http.get(this.apiURL+'/api/BLL/manageEquipment.php?action=info')as Observable<any>;
    
  }


}
