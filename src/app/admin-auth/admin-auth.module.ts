import { NgModule } from '@angular/core';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksManagementComponent } from './books-management/books-management.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './book-form/book-form.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminInfoComponent,
    DashboardComponent,
    BooksManagementComponent,
    BookFormComponent,
  ],
  imports: [SharedModule, AdminAuthRoutingModule, ReactiveFormsModule],
})
export class AdminAuthModule {}
