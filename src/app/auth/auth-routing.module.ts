import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { SignupComponent } from './signUp/signup/signup.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { userInfoGuard } from '../core/guards/user-info.guard';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'info', component: UserInfoComponent, canActivate: [userInfoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
