import {Component, OnInit} from '@angular/core';
import {TechManageEquipmentService, iUserID} from './tech-manage-equipment.service';
import {LoginService} from '../login/login.service';

@Component({
    selector: 'app-tech-manage-equipment',
    templateUrl: './tech-manage-equipment.component.html',
    styleUrls: ['./tech-manage-equipment.component.css'],
    providers: [TechManageEquipmentService]
})
export class TechManageEquipmentComponent implements OnInit {
    // Global Variable
    public userID: any;
    public info: any;
    public filter = null;

    // Default Constructor
    constructor(private tService: TechManageEquipmentService, private lService: LoginService) {
    }

    // Form Load
    ngOnInit() {
        this.userID = this.lService.getUserID();
        console.log(this.userID);
        let param: iUserID = {id: this.userID}
        this.tService.getInfo(param).subscribe(data => console.log(this.info = data));
    }

    // Sorting
    key: string = 'lastAccess'; //set default
    reverse: boolean = true;

    // Sorting method
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
}
