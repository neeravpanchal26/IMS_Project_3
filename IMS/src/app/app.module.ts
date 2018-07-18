// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents} from "./app-routing.module";
import { ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
      routingComponents
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ToastrModule.forRoot({
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
      })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
