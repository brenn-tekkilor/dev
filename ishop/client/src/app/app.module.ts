import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreReceiptSerialDataComponent } from './store-receipt-serial-data-component/store-receipt-serial-data-component';
import { CallbackComponent } from './auth/callback.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopService } from './services/shop.service';
import { HomeComponent } from './home-component/home-component';

@NgModule({
  declarations: [
    AppComponent,
    StoreReceiptSerialDataComponent,
    CallbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
