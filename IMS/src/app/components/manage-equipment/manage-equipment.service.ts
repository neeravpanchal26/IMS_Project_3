import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManageEquipmentService {

  constructor(private http:HttpClient) { }


  GetEquipmentInfo():Observable<any>
  {
    return this.http.get('api/BLL/manageEquipment.php?action=info')as Observable<any>;
    
  }


}
