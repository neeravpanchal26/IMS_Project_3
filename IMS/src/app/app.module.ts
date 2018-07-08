// Import Modules Here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents} from "./app-routing.module";
import { BusinessFooterComponent } from './components/business-footer/business-footer.component';

@NgModule({
  declarations: [
    AppComponent,
      routingComponents,
      BusinessFooterComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
