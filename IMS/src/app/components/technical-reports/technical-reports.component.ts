import {Component, OnInit} from '@angular/core';
import {TechnicalReportsService} from "./technical-reports.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import {LoginService} from "../login/login.service";
import {DatePipe} from "@angular/common";
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';

@Component({
    selector: 'app-technical-reports',
    templateUrl: './technical-reports.component.html',
    styleUrls: ['./technical-reports.component.css'],
    providers: [TechnicalReportsService, DatePipe]
})
export class TechnicalReportsComponent implements OnInit {
    // Global Variables
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
    public equipment: any;
    public status: any;
    public ehStatus = '';
    public equip;
    public ehEquip = '';

    // Default Constructor
    constructor(private service: TechnicalReportsService,
                private tService: ToastrNotificationService,
                private iService: ImageRetrieveService,
                private lService: LoginService,
                private datePipe: DatePipe) {
    }

    // Form Load
    ngOnInit() {
        // Reset Variables
        this.aType = '';
        this.eCondition = '';
        this.ehStatus = '';
        this.ehEquip = '';

        // Date Time Load Up
        this.eDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
        let date = new Date();
        this.mDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        this.sDate = this.datePipe.transform(this.mDate, 'yyyy-MM-dd');
        this.currentDateTime = Date.now();

        // Status Load up
        this.service.getStatus()
            .subscribe(data => this.status = data,
                error1 => this.tService.handleError(error1));

        // Condition Load up
        this.service.getCondition()
            .subscribe(data => this.condition = data,
                error1 => this.tService.handleError(error1));

        // Allocation Type Load up
        this.service.getAllocationTypes()
            .subscribe(data => this.allocationType = data,
                error1 => this.tService.handleError(error1));

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

        // Get Equipment History
        this.service.getEquipmentHistory(this.sDate, this.eDate, this.aType, this.eCondition, this.lService.getUserName(), this.ehStatus, this.ehEquip)
            .subscribe(data => this.equipment = data,
                error1 => this.tService.handleError(error1));

        // Get Equipment
        this.service.getEquipment(this.lService.getUserName())
            .subscribe(data => this.equip = data,
                error1 => this.tService.handleError(error1));
    }

    // Filter Selection
    selection(sDate, eDate, aType, eCondition, ehStatus, ehEquip) {
        if (sDate != null)
            this.sDate = sDate;
        if (eDate != null)
            this.eDate = eDate;
        if (aType != null)
            this.aType = aType;
        if (eCondition != null)
            this.eCondition = eCondition;
        if (ehStatus != null)
            this.ehStatus = ehStatus;
        if (ehEquip != null)
            this.ehEquip = ehEquip;

        // Get Equipment History
        this.service.getEquipmentHistory(this.sDate, this.eDate, this.aType, this.eCondition, this.lService.getUserName(), this.ehStatus, this.ehEquip)
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
