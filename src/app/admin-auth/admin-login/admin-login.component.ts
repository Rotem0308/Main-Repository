import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { BannerService } from '../../core/services/banner.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  isLoading: boolean = false;
  loginFormError: any = null;

  constructor(
    private userService: UserService,
    private bannerService: BannerService
  ) {}

  handleLogin(form: any) {
    this.loginFormError = null;
    this.isLoading = true;
    this.userService.adminLogin(form).subscribe({
      next: ({ token, role, user }) => {
        this.isLoading = false;
        this.userService.onSuccessfullLogin(token, role, user);
      },
      error: (err) => {
        this.isLoading = false;
        this.bannerService.open({
          message: err.error.message,
          status: 'error',
        });
        console.log(err);
        // this.loginFormError = err.error.message;
      },
    });
  }
}
