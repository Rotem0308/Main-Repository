import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BaseModule } from './base/base.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { BookModule } from './book/book.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BaseModule,
    BookModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
