import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class TechnicalReportsService {
    // Global Variables
    apiUrl = environment.api;

    // Default Constructor
    constructor(private http: HttpClient) {
    }

    // Business info load
    getBusinessInfo(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/business.php?action=info') as Observable<any>;
    }

    // Get Allocation types
    getAllocationTypes(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/allocateEquipment.php?action=types')as Observable<any>;
    }

    // Get Equipment Condition
    getCondition(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=condition') as Observable<any>;
    }

    // Equipment History
    getEquipmentHistory(sDate, eDate, aType, eCondition, userID, ehStatus, equip): Observable<any> {
        let params = new HttpParams()
            .set('sDate', sDate)
            .set('eDate', eDate)
            .set('aType', aType)
            .set('eCondition', eCondition)
            .set('userID', userID)
            .set('ehStatus', ehStatus)
            .set('ehEquip',equip);
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=techEmployee', {params: params})as Observable<any>;
    }

    // Get Status
    getStatus(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/installEquipment.php?action=status') as Observable<any>;
    }

    // Get Equipment
    getEquipment(userID): Observable<any> {
        let param = new HttpParams()
            .set('userID',userID);
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=equipment',{params:param}) as Observable<any>;
    }
}
