import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// Import Guards here
import { LoginGuard } from "./components/login/login.guard";

// Import Services here
import { LoginService } from "./components/login/login.service";
import { GlobalService } from "./globalAssets/global.service";

// Import Components here
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeactivateUserComponent } from './components/deactivate-user/deactivate-user.component';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
import { UserPasswordResetComponent } from './components/user-password-reset/user-password-reset.component';
import { ItPasswordResetComponent } from "./components/it-password-reset/it-password-reset.component";
import { AllocateEquipmentComponent } from './components/allocate-equipment/allocate-equipment.component';
import { BusinessFooterComponent } from "./components/business-footer/business-footer.component";
import { BusinessSettingComponent } from "./components/business-setting/business-setting.component";
import { ManageEquipmentComponent } from "./components/manage-equipment/manage-equipment.component";

// Path Array
const appRoutes:Routes = [
    // Default components
    { path: '', component:LoginComponent },
    { path: 'dashboard', canActivate: [LoginGuard], component:DashboardComponent },
    { path: 'usersetting', canActivate:[LoginGuard],component:UserSettingComponent},
    { path: 'userpassword',canActivate:[LoginGuard],component:UserPasswordResetComponent},

    // IT Technician
    { path: 'Add User', canActivate: [LoginGuard], component:AddUserComponent },
    { path: 'Remove User', canActivate:[LoginGuard], component:DeactivateUserComponent},
    { path: 'Reset password/:id',canActivate:[LoginGuard], component:ItPasswordResetComponent},
    { path: 'BuinessSetting', canActivate:[LoginGuard], component:BusinessSettingComponent},

    // Technical Employee
    { path: 'Add Equipment', canActivate:[LoginGuard], component: AddEquipmentComponent},
    { path: 'Allocate Equipment', canActivate:[LoginGuard],component:AllocateEquipmentComponent},
    { path: 'ManageEquipment', canActivate:[LoginGuard], component:ManageEquipmentComponent},
    /*{ path: 'Update Equipment', canActivate:[LoginGuard]},
    { path: 'Locate Equipment', canActivate:[LoginGuard]},

    // Section Head
    {path: 'Void Equipment', canActivate:[LoginGuard]},*/

    { path: '**', component:ErrorComponent}// Always keep this last!!
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes), CommonModule],
    exports: [RouterModule],
    providers: [LoginService,LoginGuard,GlobalService],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents =
    [
        LoginComponent,
        HeaderComponent,
        FooterComponent,
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
        ManageEquipmentComponent
    ];
