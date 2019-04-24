import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TRASIER_INTERCEPTOR} from '../../../trasier-ng/src/lib/trasier-ng.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TRASIER_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
