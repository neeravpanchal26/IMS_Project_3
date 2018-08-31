import {Component, OnInit} from '@angular/core';
import {ManageEquipmentService, iActivateEquipment} from './manage-equipment.service';
import {ToastrNotificationService} from '../../globalServices/toastr-notification.service';
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';
import {Subscription} from "rxjs";
import {QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";

@Component({
    selector: 'app-manage-equipment',
    templateUrl: './manage-equipment.component.html',
    styleUrls: ['./manage-equipment.component.css'],
    providers: [ManageEquipmentService]

})
export class ManageEquipmentComponent implements OnInit {
    // Global Variables
    public info: any;
    public filter= null;
    public qrSerial = null;
    public subscription:Subscription;

    constructor(private service: ManageEquipmentService, private toast: ToastrNotificationService,private qrService:QrCodeDecoderService) {
    }

    ngOnInit() {
        this.service.GetEquipmentInfo().subscribe(data => this.info = data);
    }

    activeEquipment(e, id, name, serial) {
        let active;
        if (e == true) {
            active = 1;
        }
        else if (e == false) {
            active = 0;
        }
        let param: iActivateEquipment = {id: id, active: active};
        this.service.ActivateEquipment(param)
            .subscribe(
                data => {
                    if (data == true) {
                        if (e == true) {
                            this.qrSerial = serial;
                            this.onClick();
                            this.toast.equipmentActivateSuccess(name);
                        }
                        else if (e == false) {
                            this.toast.equipmentDeactivateSuccess(name);
                        }
                    }
                }, error => this.toast.handleError(error));
    }

    // Qr Scanner fn
    onFileChange(event) {
        const file = event.target.files[0];
        this.subscription = this.qrService.decode(file)
            .subscribe(decodedString => {
                if (decodedString == 'error decoding QR Code')
                    this.toast.qrCodeScanError();
                else {
                    this.filter = decodedString;
                }
            });

    }

    // Qr to PDF
    onClick() {
        let data = document.getElementById('qrCode');
        html2Canvas(data).then(
            canvas => {
                // Image settings
                let imgWidth = 150;
                let pageHeight = 200;
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
