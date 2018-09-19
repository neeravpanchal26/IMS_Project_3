import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";

@Injectable()
export class TechManageEquipmentService {
    apiURL = environment.api;

    constructor(private http: HttpClient) {
    }

    getInfo(param): Observable<any> {
        return this.http.post(this.apiURL + '/api/bll/techManageEquipment.php?action=getInfo', param);
    }

    getAllocationTypes(): Observable<any> {
        return this.http.get(this.apiURL + '/api/bll/allocateEquipment.php?action=types')as Observable<any>;
    }
    // Get Status
    getStatus(): Observable<any> {
        return this.http.get(this.apiURL + '/api/BLL/installEquipment.php?action=status') as Observable<any>;
    }
}

export interface iUserID {
    id: any,
    sDate: any,
    eDate: any,
    jobType:any,
    jobStatus:any
}