// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents} from "./app-routing.module";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule} from "ngx-toastr";
import { UiSwitchModule} from "ngx-toggle-switch";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SearchPipeModule} from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule} from "ngx-pagination";
import { PasswordStrengthBarModule} from "ng2-password-strength-bar";

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
      UiSwitchModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2SearchPipeModule,
      Ng2OrderModule,
      NgxPaginationModule,
      PasswordStrengthBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
