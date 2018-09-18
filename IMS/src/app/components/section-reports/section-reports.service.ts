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

    // Get Type
    GetTypes(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addEquipment.php?action=types')as Observable<any>;
    }

    // Get Sections
    GetSections(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addEquipment.php?action=section') as Observable<any>;
    }

    // Get Suppliers
    GetSuppliers(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addEquipment.php?action=suppliers') as Observable<any>;
    }

    // Get Brand
    GetBrands(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addEquipment.php?action=brand')as Observable<any>;
    }

    // Get Status
    GetStatus(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/addEquipment.php?action=status')as Observable<any>;
    }

    // Equipment
    getEquipment(sDate, eDate, uName, eType, eCondition, eStatus, eSection, eSupplier, eBrand): Observable<any> {
        let params = new HttpParams()
            .set('sDate', sDate)
            .set('eDate', eDate)
            .set('uName', uName)
            .set('eType', eType)
            .set('eCondition', eCondition)
            .set('eStatus', eStatus)
            .set('eSection', eSection)
            .set('eSupplier', eSupplier)
            .set('eBrand', eBrand)
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=sectionHead', {params: params})as Observable<any>;
    }

    // Get Status
    getStatus(): Observable<any> {
        return this.http.get(this.apiUrl + '/api/BLL/installEquipment.php?action=status') as Observable<any>;
    }

    // Get Equipment
    getEquipments(userID): Observable<any> {
        let param = new HttpParams()
            .set('userID', userID);
        return this.http.get(this.apiUrl + '/api/BLL/reports.php?action=equipment', {params: param}) as Observable<any>;
    }
}
