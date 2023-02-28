import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../provider/RestApi';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule,IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule],
  providers: [RestApi,Storage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
