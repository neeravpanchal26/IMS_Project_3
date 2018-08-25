import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
// Import Guards here
import {LoginGuard} from "./components/login/login.guard";
// Import Global Services here
import {LoginService} from "./components/login/login.service";
import {ToastrNotificationService} from "./globalServices/toastr-notification.service";
import {QrCodeDecoderService} from "./globalServices/qr-code-decoder.service";
import {ImageRetrieveService} from "./globalServices/image-retrieve.service";
import {GeoLocationService} from "./globalServices/geolocation.service";
// Import Components here
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {AddEquipmentComponent} from './components/add-equipment/add-equipment.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {ErrorComponent} from './components/error/error.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DeactivateUserComponent} from './components/deactivate-user/deactivate-user.component';
import {UserSettingComponent} from './components/user-setting/user-setting.component';
import {UserPasswordResetComponent} from './components/user-password-reset/user-password-reset.component';
import {ItPasswordResetComponent} from "./components/it-password-reset/it-password-reset.component";
import {AllocateEquipmentComponent} from './components/allocate-equipment/allocate-equipment.component';
import {BusinessFooterComponent} from "./components/business-footer/business-footer.component";
import {BusinessSettingComponent} from "./components/business-setting/business-setting.component";
import {ManageEquipmentComponent} from "./components/manage-equipment/manage-equipment.component";
import {UpdateEquipmentComponent} from './components/update-equipment/update-equipment.component';
import {InstallEquipmentComponent} from './components/install-equipment/install-equipment.component';
import {QrtestingComponent} from "./components/qrtesting/qrtesting.component";
import {TechManageEquipmentComponent} from './components/tech-manage-equipment/tech-manage-equipment.component';
// Import Secondary components here
import {CityComponent} from "./secondaryComponents/city/city.component";
import {SuburbComponent} from "./secondaryComponents/suburb/suburb.component";

// Path Array
const appRoutes:Routes = [
    // Secondary components
    { path:'city', canActivate: [LoginGuard], component:CityComponent},
    { path:'suburb', canActivate:[LoginGuard],component:SuburbComponent},

    // Default components
    { path: '', component:LoginComponent },
    { path: 'dashboard', canActivate: [LoginGuard], component:DashboardComponent },
    { path: 'usersetting', canActivate:[LoginGuard],component:UserSettingComponent},
    { path: 'userpassword',canActivate:[LoginGuard],component:UserPasswordResetComponent},

    // IT Admin
    { path: 'Add User', canActivate: [LoginGuard], component:AddUserComponent },
    { path: 'Remove User', canActivate:[LoginGuard], component:DeactivateUserComponent},
    { path: 'Reset password/:id',canActivate:[LoginGuard], component:ItPasswordResetComponent},
    { path: 'BuinessSetting', canActivate:[LoginGuard], component:BusinessSettingComponent},
    { path: 'qr',canActivate:[LoginGuard],component:QrtestingComponent},

    // Technical Employee
    { path: 'Add Equipment', canActivate:[LoginGuard], component: AddEquipmentComponent},
    { path: 'Allocate Equipment/:id', canActivate:[LoginGuard],component:AllocateEquipmentComponent},
    { path: 'Manage Equipment', canActivate:[LoginGuard], component:ManageEquipmentComponent},
    { path: 'Update details/:id', canActivate:[LoginGuard], component:UpdateEquipmentComponent},
    { path: 'Install Equipment',canActivate:[LoginGuard], component:InstallEquipmentComponent},
    { path: 'Tech Manage Equipment',canActivate:[LoginGuard],component:TechManageEquipmentComponent},
    /*{ path: 'Locate Equipment', canActivate:[LoginGuard]},

    // Section Head
    {path: 'Void Equipment', canActivate:[LoginGuard]},*/

    { path: '**', component:ErrorComponent}// Always keep this last!!
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes), CommonModule],
    exports: [RouterModule],
    providers: [
        // Global Service Providers here
        LoginService,
        LoginGuard,
        ToastrNotificationService,
        QrCodeDecoderService,
        ImageRetrieveService,
        GeoLocationService
    ],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents =
    [
        // Secondary components start here
        CityComponent,
        SuburbComponent,

        //Primary components start here
        LoginComponent,
        HeaderComponent,
        AddEquipmentComponent,
        AddUserComponent,
        ErrorComponent,
        DashboardComponent,
        DeactivateUserComponent,
        UserSettingComponent,
        UserPasswordResetComponent,
        ItPasswordResetComponent,
        AllocateEquipmentComponent,
        BusinessFooterComponent,
        BusinessSettingComponent,
        ManageEquipmentComponent,
        UpdateEquipmentComponent,
        InstallEquipmentComponent,
        QrtestingComponent,
        TechManageEquipmentComponent
    ];
