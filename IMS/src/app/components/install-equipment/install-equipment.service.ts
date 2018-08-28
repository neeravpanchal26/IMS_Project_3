import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'leaflet/dist/images/marker-icon.png';

@Injectable()
export class InstallEquipmentService {

    // Global variable
    apiUrl = environment.api;
    public lat: any
    public long: any;
    // Default Constructor
    constructor(private http: HttpClient) { }

    getInstallEquipment(userID): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/installEquipment.php?action=install&userID=' + userID) as Observable<any>;
    }
    installation(param:iInstallEquipment)
    {
        return this.http.post(this.apiUrl + '/api/BLL/installEquipment.php?action=installEquipment',param) as Observable<any>;
    }
}
export interface iInstallEquipment
{
    serial:any, coords:any, userID:any, act:any, desc:any
}
