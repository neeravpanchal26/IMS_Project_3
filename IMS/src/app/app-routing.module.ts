import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";

//Import Services here
import { LoginService } from "./components/login/login.service";

// Import Guards here
import { LoginGuard } from "./components/login/login.guard";


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
    { path: '', component:LoginComponent },
    { path:'dashboard', canActivate: [LoginGuard], component:DashboardComponent },
    { path: 'addUser', canActivate: [LoginGuard], component:AddUserComponent },
    { path: '**', component:ErrorComponent}// Always keep this last!!
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes), CommonModule],
    exports: [RouterModule],
    providers: [LoginService, LoginGuard],
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
