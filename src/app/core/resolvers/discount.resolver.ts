import { ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { EMPTY, catchError, take } from 'rxjs';
import { BannerService } from '../services/banner.service';

export const discountResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);
  const banner = inject(BannerService);
  const userId = userService.getUserId() || '';
  return userService.getDiscount(userId).pipe(
    take(1),
    catchError((err) => {
      console.log(err),
        banner.open({ message: err?.error?.message || null, status: 'error' });
      return EMPTY;
    })
  );
};
