import {Component, OnInit} from '@angular/core';
import {ItadminReportsService} from "./itadmin-reports.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";

@Component({
    selector: 'app-itadmin-reports',
    templateUrl: './itadmin-reports.component.html',
    styleUrls: ['./itadmin-reports.component.css'],
    providers: [ItadminReportsService]
})
export class ItadminReportsComponent implements OnInit {
    // Global Variables
    public users: any;
    public type: any;
    public suburb: any;
    public city: any;
    public uType: null;
    public uCity: null;
    public uSuburb: null;

    // Default Constructor
    constructor(private service: ItadminReportsService,
                private tService: ToastrNotificationService) {
    }

    // Form Load
    ngOnInit() {
        // Users Load up
        this.service.getItAdminUsers(this.uType, this.uCity, this.uSuburb)
            .subscribe(data => this.users = data,
                error1 => this.tService.handleError(error1));

        // User Type Load up
        this.service.getUserType()
            .subscribe(data => this.type = data,
                error1 => this.tService.handleError(error1));

        // City Load up
        this.service.getCity()
            .subscribe(data => this.city = data,
                error1 => this.tService.handleError(error1));


        // Suburb Load up
        this.service.getAllSuburb()
            .subscribe(data => this.suburb = data,
                error1 => this.tService.handleError(error1));
    }

    // Filter Selection
    selection(type, city, suburb) {
        if (type != null)
            this.uType = type;
        if (city != null)
            this.uCity = city;
        if (suburb != null)
            this.uSuburb = suburb;

        // Users Load up
        this.service.getItAdminUsers(this.uType, this.uCity, this.uSuburb)
            .subscribe(data => this.users = data,
                error1 => this.tService.handleError(error1));
    }
}
