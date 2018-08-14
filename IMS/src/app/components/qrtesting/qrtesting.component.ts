import { Component, OnInit} from '@angular/core';


// Scanner
import { QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";
import { Subscription} from "rxjs/Subscription";

// Div to image to PDF
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';

@Component({
  selector: 'app-qrtesting',
  templateUrl: './qrtesting.component.html',
  styleUrls: ['./qrtesting.component.css'],
})
export class QrtestingComponent implements OnInit {
  // Global Variable
  public test = 'Equipment ID Print working.';
  public result = 'Barcode';
  subscription:Subscription;

  // Default Constructor
  constructor(private qrService:QrCodeDecoderService) { }

  // Form Load
  ngOnInit() {
  }

  // Destroyer
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  // File reading
  onFileChange(event) {
      const file = event.target.files[0];
      this.subscription = this.qrService.decode(file)
          .subscribe(decodedString => console.log(this.result = decodedString));
  }

  // Qr to PDF
  onClick() {
    var data = document.getElementById('qrCode');
    html2Canvas(data).then(
        canvas => {
        // Image settings
        var imgWidth = 150;
        var pageHeight = 200;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        // A4 size page of PDF
        let pdf = new jsPdf('p', 'mm', 'a4');
        var topPx = 5;
        var leftPx = 5;
        pdf.addImage(contentDataURL, 'PNG', leftPx, topPx, imgWidth, imgHeight);
        // Generated PDF
        pdf.save('MYPdf.pdf');
    });
  }
}
