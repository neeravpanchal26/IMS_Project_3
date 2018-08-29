import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class InspectEquipmentService {
    // Global Variables
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Get Equipment to inspect
    getEquipmentToInspect(userID):Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/inspectEquipment.php?action=equipments&userID=' + userID) as Observable<any>;
    }

    // Get Equipment Condition
    getCondition():Observable<any> {
        return this.http.get(this.apiUrl+'/api/BLL/addEquipment.php?action=condition')as Observable<any>;
    }

    // Get equipment info by serial
    getEquipmentInfoBySerial(serial):Observable<any> {
        return this.http.get(this.apiUrl+'/api/BLL/inspectEquipment.php?action=individualInfo&serial='+serial) as Observable<any>;
    }

    // Get equipment Image by serial
    getEquipmentImageBySerial(serial):Observable<any> {
        return this.http.get(this.apiUrl+'/api/BLL/inspectEquipment.php?action=individualInfoImage&serial='+serial) as Observable<any>;
    }

    // Insert Inspection
    insertInspection(param:iInspect):Observable<any> {
        return this.http.post(this.apiUrl+'/api/BLL/inspectEquipment.php?action=insert',param) as Observable<any>;
    }
}
// Wrapper Classes
export interface iInspect {
    userID:any,
    serial:any,
    condition:any,
    value:any,
    status:any,
    description:any
}
