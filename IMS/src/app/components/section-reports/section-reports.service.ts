import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SectionReportsService {
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
        return this.http.get(this.apiUrl + '/api/bll/allocateEquipment.php?action=types')as Observable<any>;
    }

    // Get Equipment Condition
    getCondition(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/maintainEquipment.php?action=condition') as Observable<any>;
    }

    // Get Employees
    getEmployees(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/bll/allocateEquipment.php?action=techEmployees')as Observable<any>;
    }

    // Equipment History
    getEquipmentHistory(sDate, eDate, aType, eCondition, userID): Observable<any> {
        let params = new HttpParams()
            .set('sDate', sDate)
            .set('eDate', eDate)
            .set('aType', aType)
            .set('eCondition', eCondition)
            .set('userID', userID);
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=techEmployee', {params: params})as Observable<any>;
    }
}
