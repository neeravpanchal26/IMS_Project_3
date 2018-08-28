import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {LoginService} from "../login/login.service";
import {InspectEquipmentService} from "./inspect-equipment.service";
import {QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-inspect-equipment',
    templateUrl: './inspect-equipment.component.html',
    styleUrls: ['./inspect-equipment.component.css'],
    providers: [InspectEquipmentService]
})
export class InspectEquipmentComponent implements OnInit {
    // Global Variables
    public inspectEquipmentForm: FormGroup;
    public equipment;
    public subscription:Subscription;

    // Default Constructor
    constructor(private formBuilder: FormBuilder,
                private tService: ToastrNotificationService,
                private lService: LoginService,
                private service: InspectEquipmentService,
                private qrService:QrCodeDecoderService) {
    }

    // Form Load
    ngOnInit() {
        // Form Validation
        this.buildForm();

        // Get Equipment to inspect
        this.service.getEquipmentToInspect(this.lService.getUserID())
            .subscribe(data => this.equipment = data,
                error => this.tService.handleError(error));
    }

    // Inspect Equipment
    inspectEquipment(e) {
        if (e.valid) {

        }
        else if (e.invalid)
            this.tService.formFailure();
    }

    // Qr Scanner fn
    onFileChange(event) {
        const file = event.target.files[0];
        this.subscription = this.qrService.decode(file)
            .subscribe(decodedString => {
                if (decodedString == 'error decoding QR Code')
                    this.tService.qrCodeScanError();
                else
                    this.inspectEquipmentForm.controls['equipmentSerial'].setValue(decodedString);
            });

    }

    // Selection setter
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    // Form Builder
    buildForm(): void {
        this.inspectEquipmentForm = this.formBuilder.group({
            'equipmentCondition': ['', Validators.required],
            'equipmentSerial': ['', Validators.required],
            'equipmentValue': ['', Validators.required],
            'inspectionStatus': ['', Validators.required],
            'description': ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
        });
    }
}
