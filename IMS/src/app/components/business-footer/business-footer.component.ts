import { Component, OnInit } from '@angular/core';
import {BusinessFooterService} from "./business-footer.service";

@Component({
  selector: 'app-business-footer',
  templateUrl: './business-footer.component.html',
  styleUrls: ['./business-footer.component.css'],
    providers:[BusinessFooterService]
})
export class BusinessFooterComponent implements OnInit {
  // Gloabal variable
  public business:any;
  // Default Constructor
  constructor(private service:BusinessFooterService) { }

  // Form Load
  ngOnInit() {
    this.service.getBusinessInfo().subscribe(data=>this.business = data[0]);
  }

}
