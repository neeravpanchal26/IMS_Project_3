import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class MaintainEquipmentService {
    // Global Variable
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Get Equipment to Maintain
    getEquipmentToMaintain(userID): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=equipments&userID=' + userID)as Observable<any>;
    }

    // Get Equipment Condition
    getCondition(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=condition') as Observable<any>;
    }

    // Get Equipment Info by serial
    getEquipmentInfoBySerial(serial): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=individualInfo&serial=' + serial) as Observable<any>;
    }

    // Get Equipment Image By serial
    getEquipmentImageBySerial(serial): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=individualInfoImage&serial=' + serial, {responseType: 'blob'}) as Observable<any>;
    }

    // Insert Maintain
    insertMaintain(param: iMaintain): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/maintainEquipment.php?action=insert', param)as Observable<any>;
    }

    // upload image
    uploadImage(param: FormData): Observable<any> {
        return this.http.post(this.apiUrl + '/api/BLL/maintainEquipment.php?action=imageUpload', param) as Observable<any>;
    }

}
// Wrapper Classes
export interface iMaintain {
    userID: any,
    serial: any,
    condition: any,
    value: number,
    status: number,
    description: any
}
