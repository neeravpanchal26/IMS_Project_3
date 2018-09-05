import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
    // Global Variable
    public userType;

    // Default Constructor
    constructor(private lService:LoginService) {
    }

    // Form Load
    ngOnInit() {
        this.userType=this.lService.getUserType();
    }

}
