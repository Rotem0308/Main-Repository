import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading: boolean = false;
  signupFormError: any = null;
  constructor(
    private userService: UserService,
    private bannerService: BannerService,
    private router: Router
  ) {}

  handleSignup(form: any) {
    console.log(form);
    this.signupFormError = null;
    this.isLoading = true;
    this.userService.signup(form).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.bannerService.open({
          message: 'SignUp successfully',
          status: 'success',
        });
        res.userRole == 'User'
          ? this.router.navigate([`/user/login`])
          : this.router.navigate([`/admin/login`]);
      },
      error: (err) => {
        this.isLoading = false;
        this.bannerService.open({
          message: err.error.message,
          status: 'error',
        });
        console.log(err);
        // this.signupFormError = err.error.message;
      },
    });
  }
}
