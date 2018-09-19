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

    // Business Info
    public business: any;
    public currentDateTime: any;
    public businessLogo: any;

    // Default DLL
    public eDate: any;
    public sDate: any;
    public mDate: any;
    public equipment = [];

    // Equipment History DLL
    public allocationType: any;
    public condition: any;
    public ehStatusDLL: any;
    public equipments = [];

    // Equipment History Filter
    public aType = '';
    public eCondition = '';
    public userName = '';
    public ehStatus = '';
    public ehEquip = '';

    // Equipment DDL
    public status: any;
    public types: any;
    public sections: any;
    public suppliers: any;
    public brands: any;
    public employees: any;

    // Equipment Filter
    public eType = '';
    public eStatus = '';
    public eSection = '';
    public eSupplier = '';
    public eBrand = '';

    // Default Constructor
    constructor(private datePipe: DatePipe,
                private service: SectionReportsService,
                private tService: ToastrNotificationService,
                private iService: ImageRetrieveService) {
    }

    // Form Load
    ngOnInit() {
        // Load up
        this.equipmentLoadUp();

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
        if (e == 1) {
            this.equipmentLoadUp();
        }
        if (e == 2) {
            this.equipmentHistoryLoadUp();
        }
    }

    // Equipment Load up
    equipmentLoadUp() {
        // Reset Variables
        this.userName = '';
        this.eType = '';
        this.eCondition = '';
        this.eStatus = '';
        this.eSection = '';
        this.eSupplier = '';
        this.eBrand = '';

        // Date Time Load Up
        this.dateTimeLoadUp();

        // Employee Load Up
        this.service.getEmployees()
            .subscribe(data => this.employees = data,
                error1 => this.tService.handleError(error1));

        // Type Load up
        this.service.GetTypes()
            .subscribe(data => this.types = data,
                error1 => this.tService.handleError(error1));

        // Condition Load up
        this.service.getCondition()
            .subscribe(data => this.condition = data,
                error1 => this.tService.handleError(error1));

        // Status Load up
        this.service.GetStatus()
            .subscribe(data => this.status = data,
                error1 => this.tService.handleError(error1));

        // Section Load up
        this.service.GetSections()
            .subscribe(data => this.sections = data,
                error1 => this.tService.handleError(error1));

        // Supplier Load up
        this.service.GetSuppliers()
            .subscribe(data => this.suppliers = data,
                error1 => this.tService.handleError(error1));

        // Brand Load up
        this.service.GetBrands()
            .subscribe(data => this.brands = data,
                error1 => this.tService.handleError(error1));

        // Get Equipment
        this.getEquipment();
    }

    // Equipment History Load Up
    equipmentHistoryLoadUp() {
        // Reset Variable
        this.aType = '';
        this.eCondition = '';
        this.userName = '';
        this.ehStatus = '';
        this.ehEquip = '';

        // Date Time Load Up
        this.dateTimeLoadUp();

        // Employee Load Up
        this.service.getEmployees()
            .subscribe(data => this.employees = data,
                error1 => this.tService.handleError(error1));

        // Allocation Type Load up
        this.service.getAllocationTypes()
            .subscribe(data => this.allocationType = data,
                error1 => this.tService.handleError(error1));

        // Get Status
        this.service.getStatus()
            .subscribe(data => this.ehStatusDLL = data,
                error1 => this.tService.handleError(error1));

        // Get Equipments
        this.service.getEquipments(this.userName)
            .subscribe(data => this.equipments = data,
                error1 => this.tService.handleError(error1));

        // Get Equipment History
        this.getEquipmentHistory();

    }

    // Date Time Load Up
    dateTimeLoadUp() {
        this.eDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
        let date = new Date();
        this.mDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        this.sDate = this.datePipe.transform(this.mDate, 'yyyy-MM-dd');
        this.currentDateTime = Date.now();
    }


    // Filter Selection
    hSelection(sDate, eDate, aType, eCondition, userID, ehStatus, ehEquip) {
        if (sDate != null)
            this.sDate = sDate;
        if (eDate != null)
            this.eDate = eDate;
        if (aType != null)
            this.aType = aType;
        if (eCondition != null)
            this.eCondition = eCondition;
        if (userID != null) {
            this.userName = userID;
            // Get Equipments
            this.service.getEquipments(this.userName)
                .subscribe(data => this.equipments = data,
                    error1 => this.tService.handleError(error1));
        }
        if (ehStatus != null)
            this.ehStatus = ehStatus;
        if (ehEquip != null)
            this.ehEquip = ehEquip;

        // Get Equipment History
        this.getEquipmentHistory();
    }

    // Filter Selection
    eSelection(sDate, eDate, uName, eType, eCondition, eStatus, eSection, eSupplier, eBrand) {
        if (sDate != null)
            this.sDate = sDate;
        if (eDate != null)
            this.eDate = eDate;
        if (uName != null)
            this.userName = uName;
        if (eType != null)
            this.eType = eType;
        if (eCondition != null)
            this.eCondition = eCondition;
        if (eStatus != null)
            this.eStatus = eStatus;
        if (eSection != null)
            this.eSection = eSection;
        if (eSupplier != null)
            this.eSupplier = eSupplier;
        if (eBrand != null)
            this.eBrand = eBrand;

        // Get Equipment
        this.getEquipment();
    }

    // Get Equipment History
    getEquipmentHistory() {
        this.service.getEquipmentHistory(this.sDate, this.eDate, this.aType, this.eCondition, this.userName, this.ehStatus, this.ehEquip)
            .subscribe(data => this.equipment = data,
                error1 => this.tService.handleError(error1));
    }

    // Get Equipment
    getEquipment() {
        this.service.getEquipment(this.sDate, this.eDate, this.userName, this.eType, this.eCondition, this.eStatus, this.eSection, this.eSupplier, this.eBrand)
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

        let data = document.getElementById(this.show.toString());
        html2Canvas(data).then(
            canvas => {
                // Image settings
                let imgWidth;
                if (this.equipment.length > 20)
                    imgWidth = 200;
                else
                    imgWidth = 285;
                let pageHeight = canvas.height;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png');
                let pdf;
                // A4 size page of PDF
                if (this.equipment.length > 20)
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
