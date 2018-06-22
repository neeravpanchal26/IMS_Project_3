// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes} from "@angular/router";

// Import Components here
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Import Services here
import { LoginService } from "./components/login/login.service";

// Import Guards here
import { LoginGuard } from "./components/login/login.guard";
import { DeactivateUserComponent } from './components/deactivate-user/deactivate-user.component';

// Path Array
const appRoutes:Routes = [
    {
      path: '',
        component:LoginComponent
    },
    {
      path:'dashboard',
        canActivate: [LoginGuard],
        component:DashboardComponent
    },
    {
      path: 'addUser',
        canActivate: [LoginGuard],
        component:AddUserComponent
    }
    ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AddEquipmentComponent,
    AddUserComponent,
    ErrorComponent,
    DashboardComponent,
    DeactivateUserComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
