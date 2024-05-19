import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BannerService } from '../../../core/services/banner.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnDestroy {
  isLoading: boolean = false;
  loginFormError: any = null;
  loginFormSub!: Subscription;
  constructor(
    private userService: UserService,
    private bannerService: BannerService
  ) {}
  ngOnDestroy(): void {
    this.loginFormSub?.unsubscribe();
  }

  handleLogin(form: any) {
    this.loginFormError = null;
    this.isLoading = true;
    // try {
    //   const { token, role, user } = await firstValueFrom(
    //     this.userService.userLogin(form)
    //   );
    //   this.isLoading = false;
    //   this.userService.onSuccessfullLogin(token, role, user);
    //   console.log(user);
    // } catch (err) {
    //   this.isLoading = false;
    //   this.bannerService.open(err.error.message);
    //   console.log(err);
    // }

    this.loginFormSub = this.userService.userLogin(form).subscribe({
      next: ({ token, role, user }) => {
        this.isLoading = false;
        this.userService.onSuccessfullLogin(token, role, user);
        console.log(user);
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
