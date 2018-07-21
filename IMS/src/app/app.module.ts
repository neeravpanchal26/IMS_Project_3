// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents} from "./app-routing.module";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule} from "ngx-toastr";
import { UiSwitchModule} from "ngx-toggle-switch";

@NgModule({
  declarations: [
    AppComponent,
      routingComponents
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
      UiSwitchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
