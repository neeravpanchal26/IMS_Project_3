import {Component, OnInit} from '@angular/core';
import {TechManageEquipmentService, iUserID} from './tech-manage-equipment.service';
import {LoginService} from '../login/login.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-tech-manage-equipment',
    templateUrl: './tech-manage-equipment.component.html',
    styleUrls: ['./tech-manage-equipment.component.css'],
    providers: [TechManageEquipmentService,DatePipe]
})
export class TechManageEquipmentComponent implements OnInit {
    // Global Variable
    public userID: any;
    public info: any;
    public filter = null;
    public p = null;
    public eDate;
    public mDate;
    public sDate;

    // Default Constructor
    constructor(private tService: TechManageEquipmentService, private lService: LoginService,private datePipe:DatePipe) {
    }

    // Form Load
    ngOnInit() {
        // Date Time Load Up
        this.eDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
        let date = new Date();
        this.mDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        this.sDate = this.datePipe.transform(this.mDate, 'yyyy-MM-dd');

        this.userID = this.lService.getUserID();
        let param: iUserID = {id: this.userID,sDate:this.sDate,eDate:this.eDate}
        this.tService.getInfo(param).subscribe(data => this.info = data);
    }
    // Date Change
    dateChange(sDate,eDate){
        if(sDate != null)
            this.sDate = sDate;
        if(eDate != null)
            this.eDate = eDate;

        let param: iUserID = {id: this.userID,sDate:this.sDate,eDate:this.eDate}
        this.tService.getInfo(param).subscribe(data => this.info = data);
    }

    // Sorting
    key: string = 'Active'; //set default
    reverse: boolean = true;

    // Sorting method
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
}
