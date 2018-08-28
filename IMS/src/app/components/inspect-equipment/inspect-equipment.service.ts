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
}
