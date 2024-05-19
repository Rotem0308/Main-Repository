import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './icons/cart-icon/cart.component';
import { UserIconComponent } from './icons/user-icon/user-icon.component';
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { AddCartIconComponent } from './icons/add-cart-icon/add-cart-icon.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';

import { HamburgerComponent } from './icons/hamburger/hamburger.component';

import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { SettingIconComponent } from './icons/setting-icon/setting-icon.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckoutModalComponent } from './checkout-modal/checkout-modal.component';

@NgModule({
  declarations: [
    CartComponent,
    UserIconComponent,
    SearchIconComponent,
    AddCartIconComponent,
    ErrorMessageComponent,
    LoginFormComponent,
    InfoComponent,
    HamburgerComponent,
    EditUserModalComponent,
    SettingIconComponent,
    PaginationComponent,
    CheckoutModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CartComponent,
    UserIconComponent,
    SearchIconComponent,
    AddCartIconComponent,
    ErrorMessageComponent,
    LoginFormComponent,
    InfoComponent,
    HamburgerComponent,
    EditUserModalComponent,
    SettingIconComponent,
    PaginationComponent,
    CheckoutModalComponent,
    CommonModule,
  ],
})
export class SharedModule {}
