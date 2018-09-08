import {Component, OnInit} from '@angular/core';
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';
import {DatePipe} from "@angular/common";
import {SectionReportsService} from "./section-reports.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'app-section-reports',
    templateUrl: './section-reports.component.html',
    styleUrls: ['./section-reports.component.css'],
    providers: [DatePipe, SectionReportsService]
})
export class SectionReportsComponent implements OnInit {
    // Global Variables
    public show = 1;
    public business: any;
    public currentDateTime: any;
    public businessLogo: any;
    public allocationType: any;
    public condition: any;
    public eDate: any;
    public sDate: any;
    public mDate: any;
    public aType = '';
    public eCondition = '';
    public equipment = [];
    public employees: any;
    public userName = '';

    // Default Constructor
    constructor(private datePipe: DatePipe,
                private service: SectionReportsService,
                private tService: ToastrNotificationService,
                private iService: ImageRetrieveService) {
    }

    // Form Load
    ngOnInit() {
        // Date Time Load Up
        this.eDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
        let date = new Date();
        this.mDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        this.sDate = this.datePipe.transform(this.mDate, 'yyyy-MM-dd');
        this.currentDateTime = Date.now();

        // Load Logo
        this.iService.getLogo()
            .subscribe(
                data => this.businessLogo = this.iService.selectPhoto(data),
                error => this.tService.handleError(error));

        // Business Info Load up
        this.service.getBusinessInfo()
            .subscribe(
                data => this.business = data[0],
                error => this.tService.handleError(error));
    }

    // Report Type to display
    reportType(e) {
        this.show = e;
        if (e == 2) {
            // Employee Load Up
            this.service.getEmployees()
                .subscribe(data => this.employees = data,
                    error1 => this.tService.handleError(error1));

            // Condition Load up
            this.service.getCondition()
                .subscribe(data => this.condition = data,
                    error1 => this.tService.handleError(error1));

            // Allocation Type Load up
            this.service.getAllocationTypes()
                .subscribe(data => this.allocationType = data,
                    error1 => this.tService.handleError(error1));

            // Get Equipment History
            this.service.getEquipmentHistory(this.sDate, this.eDate, this.aType, this.eCondition, this.userName)
                .subscribe(data => this.equipment = data,
                    error1 => this.tService.handleError(error1));
        }
    }

    // Filter Selection
    selection(sDate, eDate, aType, eCondition, userID) {
        if (sDate != null)
            this.sDate = sDate;
        if (eDate != null)
            this.eDate = eDate;
        if (aType != null)
            this.aType = aType;
        if (eCondition != null)
            this.eCondition = eCondition;
        if (userID != null)
            this.userName = userID;

        // Get Equipment History
        this.service.getEquipmentHistory(this.sDate, this.eDate, this.aType, this.eCondition, this.userName)
            .subscribe(data => this.equipment = data,
                error1 => this.tService.handleError(error1));
    }

    // Sorting
    key: string = 'EquipmentID'; //set default
    reverse: boolean = false;

    // Sorting method
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    // Qr to PDF
    onClick() {
        let data = document.getElementById(this.show.toString());
        html2Canvas(data).then(
            canvas => {
                // Image settings
                let imgWidth ;
                if (this.equipment.length>20)
                    imgWidth = 200;
                else
                    imgWidth = 285;
                let pageHeight = canvas.height;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png');
                let pdf;
                // A4 size page of PDF
                if (this.equipment.length>20)
                    pdf = new jsPdf('p', 'mm', 'a4');
                else
                    pdf = new jsPdf('l', 'mm', 'a4');
                let topPx = 5;
                let leftPx = 5;
                pdf.addImage(contentDataURL, 'PNG', leftPx, topPx, imgWidth, imgHeight);
                // Generated PDF
                pdf.save(this.currentDateTime + '.pdf');
            });
    }
}
