import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { SignupComponent } from './signUp/signup/signup.component';
import { SignupFormComponent } from './signUp/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    SignupComponent,
    SignupFormComponent,
    UserInfoComponent,
  ],
  imports: [SharedModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
