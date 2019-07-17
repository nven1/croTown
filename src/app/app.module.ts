import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountyListComponent } from './county-list/county-list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    CountyListComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
