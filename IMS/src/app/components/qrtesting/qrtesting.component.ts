import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

// Scanner
import { QrScannerComponent} from "angular2-qrscanner";

// Generator


@Component({
  selector: 'app-qrtesting',
  templateUrl: './qrtesting.component.html',
  styleUrls: ['./qrtesting.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrtestingComponent implements OnInit {
  // Global Variable
  public test = 'masterpanchieneerav@ims.com';

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor() { }

    ngOnInit() {
        this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0) {
                let choosenDev;
                for (const dev of videoDevices) {
                    if (dev.label.includes('front')) {
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });

        this.qrScannerComponent.capturedQr.subscribe(result => {
            console.log(result);
        });
    }

}
