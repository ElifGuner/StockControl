import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { BootstrapFormComponent } from './components/bootstrap-form/bootstrap-form.component';
import { SigninComponent } from './components/signin/signin.component';
import { RouterModule } from '@angular/router';
import { StockInterceptor } from './stock.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    BootstrapFormComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: StockInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
