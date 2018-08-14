import { Component, OnInit} from '@angular/core';


// Scanner
import { QrCodeDecoderService} from "../../globalServices/qr-code-decoder.service";
import { Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-qrtesting',
  templateUrl: './qrtesting.component.html',
  styleUrls: ['./qrtesting.component.css'],
})
export class QrtestingComponent implements OnInit {
  // Global Variable
  public test = 'Sean doent know what is qr code.';
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
}
