import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// Import Guards here
import { LoginGuard } from "./components/login/login.guard";

// Import Services here
import { LoginService } from "./components/login/login.service";

// Import Components here
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeactivateUserComponent } from './components/deactivate-user/deactivate-user.component';

// Path Array
const appRoutes:Routes = [
    // Default components
    { path: '', component:LoginComponent },
    { path: 'dashboard', canActivate: [LoginGuard], component:DashboardComponent },

    // IT Technician
    { path: 'Add User', canActivate: [LoginGuard], component:AddUserComponent },
    { path: 'Remove User', canActivate:[LoginGuard], component:DeactivateUserComponent},

    // Technical Employee
    { path: 'Add Equipment', canActivate:[LoginGuard], component: AddEquipmentComponent},
    /*{ path: 'Update Equipment', canActivate:[LoginGuard]},
    { path: 'Locate Equipment', canActivate:[LoginGuard]},

    // Section Head
    {path: 'Void Equipment', canActivate:[LoginGuard]},*/

    { path: '**', component:ErrorComponent}// Always keep this last!!
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes), CommonModule],
    exports: [RouterModule],
    providers: [LoginService,LoginGuard],
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
        DeactivateUserComponent
    ];
