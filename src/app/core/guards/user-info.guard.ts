import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BannerService } from '../services/banner.service';

export const userInfoGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const bannerService = inject(BannerService);
  const router = inject(Router);
  if (userService.getAuthToken() == null) {
    bannerService.open({ message: 'Not Allowed', status: 'error' });
    router.navigate(['']);
  }
  return true;
};
