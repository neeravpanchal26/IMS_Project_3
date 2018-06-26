import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllocateEquipmentService {

  constructor(private http:HttpClient) { }

  getTechEmployees():Observable<any>
  {
    return this.http.get('/api/BLL/allocateEquipment.php?action=techEmployees')as Observable<any>;
  }
  getEquipment():Observable<any>
  {
    return this.http.get('/api/BLL/allocateEquipment.php?action=equipment')as Observable<any>;
  }
}
