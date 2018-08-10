import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class InstallEquipmentService {

     // Global variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient) { }

  getCoords():Observable<any>
  {
      return this.http.get(this.apiUrl+'/api/BLL/installEquipment.php?action=coords')as Observable<any>;
  }
}
