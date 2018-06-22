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

}
