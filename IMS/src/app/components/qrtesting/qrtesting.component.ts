import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

// Div to image to PDF
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';
import {ManageEquipmentService} from "../manage-equipment/manage-equipment.service";

@Component({
    selector: 'app-qrtesting',
    templateUrl: './qrtesting.component.html',
    styleUrls: ['./qrtesting.component.css'],
    providers: [ManageEquipmentService]
})
export class QrtestingComponent implements OnInit {
    // Global Variable
    public qrSerial;
    public equipment;

    // Default Constructor
    constructor(private active: ActivatedRoute,
                private service: ManageEquipmentService) {
    }

    // Form Load
    ngOnInit() {
        // Get serial from query string
        this.qrSerial = this.active.snapshot.paramMap.get('serial');

        // Get equipment info by serial
        this.service.getEquipmentBySerial(this.qrSerial)
            .subscribe(data => this.equipment = data[0]);
    }

    // Qr to PDF
    onClick() {
        let data = document.getElementById('qrCode');
        html2Canvas(data).then(
            canvas => {
                // Image settings
                let imgWidth = 75;
                let pageHeight = 100;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png');
                // A4 size page of PDF
                let pdf = new jsPdf('p', 'mm', 'a4');
                let topPx = 5;
                let leftPx = 5;
                pdf.addImage(contentDataURL, 'PNG', leftPx, topPx, imgWidth, imgHeight);
                // Generated PDF
                pdf.save(this.qrSerial + '.pdf');
            });
    }
}
