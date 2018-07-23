// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents} from "./app-routing.module";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule} from "ngx-toastr";
import { UiSwitchModule} from "ngx-toggle-switch";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ManageEquipmentComponent } from './component/manage-equipment/manage-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
      routingComponents,
      ManageEquipmentComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ToastNoAnimationModule,
      ToastrModule.forRoot({
          toastComponent: ToastNoAnimation,
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
      }),
      UiSwitchModule,
      FormsModule,
      ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
