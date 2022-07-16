import {Component, OnInit} from '@angular/core';
import {ItadminReportsService} from "./itadmin-reports.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import {DatePipe} from "@angular/common";
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';

@Component({
    selector: 'app-itadmin-reports',
    templateUrl: './itadmin-reports.component.html',
    styleUrls: ['./itadmin-reports.component.css'],
    providers: [ItadminReportsService, DatePipe]
})
export class ItadminReportsComponent implements OnInit {
    // Global Variables
    public users: any;
    public type: any;
    public suburb: any;
    public city: any;
    public uType = '';
    public uCity = '';
    public uSuburb = '';
    public businessLogo: any;
    public currentDateTime: any;
    public business: any;

    // Default Constructor
    constructor(private service: ItadminReportsService,
                private tService: ToastrNotificationService,
                private iService: ImageRetrieveService,
                private dt: DatePipe) {
    }

    // Form Load
    ngOnInit() {
        // Reset Variables
        this.uType = '';
        this.uCity = '';
        this.uSuburb = '';

        // Load Logo
        this.iService.getLogo()
            .subscribe(
                data => this.businessLogo = this.iService.selectPhoto(data),
                error => this.tService.handleError(error));

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

        // Current Date time
        this.currentDateTime = Date.now();

        // Business Info Load up
        this.service.getBusinessInfo()
            .subscribe(
                data => this.business = data[0],
                error => this.tService.handleError(error));
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

    // Sorting
    key: string = 'UserID'; //set default
    reverse: boolean = false;

    // Sorting method
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    // Qr to PDF
    onClick() {
        // Current Date time
        this.currentDateTime = Date.now();

        let data = document.getElementById('Report');
        html2Canvas(data).then(
            canvas => {
                // Image settings
                let imgWidth = 285;
                let pageHeight = canvas.height;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png');
                // A4 size page of PDF
                let pdf = new jsPdf('l', 'mm', 'a4');
                let topPx = 5;
                let leftPx = 5;
                pdf.addImage(contentDataURL, 'PNG', leftPx, topPx, imgWidth, imgHeight);
                // Generated PDF
                pdf.save(this.currentDateTime + '.pdf');
            });
    }
}
