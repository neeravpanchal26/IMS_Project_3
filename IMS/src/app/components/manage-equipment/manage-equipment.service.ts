import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";

@Injectable()
export class ManageEquipmentService {
    apiURL = environment.api;

    constructor(private http: HttpClient) {
    }


    GetEquipmentInfo(): Observable<any> {
        return this.http.get(this.apiURL + '/api/BLL/manageEquipment.php?action=info')as Observable<any>;

    }

    ActivateEquipment(param: iActivateEquipment): Observable<any> {
        return this.http.post(this.apiURL + '/api/BLL/manageEquipment.php?action=active', param)as Observable<any>;
    }

    // Get equipment by serial
    getEquipmentBySerial(serial): Observable<any> {
        return this.http.get(this.apiURL + '/api/BLL/manageEquipment.php?action=equipmentInfo&serial=' + serial) as Observable<any>;
    }

}

export interface iActivateEquipment {
    id: any,
    active: any
}
