import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrillImgComponent } from './drill-img/drill-img.component';
import { DataService } from './data.service';
import { DataTestingComponent } from './data-testing/data-testing.component';
import { InputDisplayComponent } from './input-display/input-display.component';
import { OutputDisplayComponent } from './output-display/output-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    DrillImgComponent,
    DataTestingComponent,
    InputDisplayComponent,
    OutputDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
