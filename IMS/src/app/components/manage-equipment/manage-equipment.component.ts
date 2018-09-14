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
    public filter = null;
    public qrSerial = null;
    public subscription: Subscription;
    public p = null;

    constructor(private service: ManageEquipmentService, private toast: ToastrNotificationService, private qrService: QrCodeDecoderService) {
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
                            this.toast.equipmentActivateSuccess(name);
                        }
                        else if (e == false) {
                            this.toast.equipmentDeactivateSuccess(name);
                        }
                    }
                }, error => this.toast.handleError(error));
    }

    // Sorting
    key: string = 'DateReceived'; //set default
    reverse: boolean = true;

    // Sorting method
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
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
}
