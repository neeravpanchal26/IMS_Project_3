import { Component, OnInit } from '@angular/core';
import { GlobalService} from "../../globalAssets/global.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  // Global variable
  public businessLogo:any;

  // Default Constructor
  constructor(private gService:GlobalService) { }

  // Form load
  ngOnInit() {
      // Load Logo
      this.gService.getLogo()
          .subscribe(
              data => this.businessLogo = this.gService.selectPhoto(data),
              error => this.gService.handleError(error));
  }

}
