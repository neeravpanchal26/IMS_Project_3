import { Component, OnInit} from '@angular/core';


// Scanner
import { QrCodeReaderService} from "./qr-code-reader.service";
import { Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-qrtesting',
  templateUrl: './qrtesting.component.html',
  styleUrls: ['./qrtesting.component.css'],
    providers:[QrCodeReaderService]
})
export class QrtestingComponent implements OnInit {
  // Global Variable
  public test = 'masterpanchieneerav@ims.com';

  subscription:Subscription;
  result;

  // Default Constructor
  constructor(private qrReader:QrCodeReaderService) { }

  // Destoryer
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  // File reading
  onFileChange(event) {
      const file = event.target.files[0];
      this.subscription = this.qrReader.decode(file)
          .subscribe(decodedString => console.log(this.result = decodedString));
  }
  ngOnInit() {
  }
}
