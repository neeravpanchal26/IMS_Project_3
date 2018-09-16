import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {HeaderService} from "./header.service";
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {ImageRetrieveService} from "../../globalServices/image-retrieve.service";
import {environment} from "../../../environments/environment";
import {IImage} from "ng-simple-slideshow";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
    // Global Declaration
    public userType;
    public userName;
    public businessLogo: any;
    public policy;
    public apiUrl = environment.api;

    // Help Image Arrays
    public ItHelp: (string | IImage)[] = [
        {url: this.apiUrl + '/api/Assets/itAdminHelp/01.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/02.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/03.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/04.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/05.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/06.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/07.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/08.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/09.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/itAdminHelp/10.jpg', backgroundSize: 'contain'},
    ];

    public TechnicalHelp: (string | IImage)[] = [
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/01.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/02.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/03.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/04.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/05.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/06.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/07.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/08.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/09.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/technicalEmployeeHelp/10.jpg', backgroundSize: 'contain'},
    ];

    public SectionHelp: (string| IImage)[]=[
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/01.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/02.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/03.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/04.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/05.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/06.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/07.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/08.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/09.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/10.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/11.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/12.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/13.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/14.jpg', backgroundSize: 'contain'},
        {url: this.apiUrl + '/api/Assets/sectionHeadHelp/15.jpg', backgroundSize: 'contain'},
    ];

    // Default Constructor
    constructor(private service: LoginService,
                private header: HeaderService,
                private tService: ToastrNotificationService,
                private iService: ImageRetrieveService) {
    }

    // Page Load
    ngOnInit() {
        // Get user type
        this.userType = this.service.getUserType();

        // Get username
        this.userName = this.service.getUserName();

        // Load Logo
        this.iService.getLogo()
            .subscribe(
                data => this.businessLogo = this.iService.selectPhoto(data),
                error => this.tService.handleError(error));

        // Load Policy
        this.header.getPolicy()
            .subscribe(data => this.policy = this.iService.selectPhoto(data),
                error1 => this.tService.handleError(error1));
    }
}
