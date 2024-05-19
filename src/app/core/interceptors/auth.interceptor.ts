import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, of } from 'rxjs';
import { BannerService } from '../services/banner.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const bannerService = inject(BannerService);
  const userToken = userService.getAuthToken();
  console.log(userToken);
  console.log('somthing');
  const authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${userToken}`),
  });
  return next(authReq);
  // return next(authReq).pipe(
  //   catchError((requestError: HttpErrorResponse) => {
  //     if (requestError && requestError.status === 401) {
  //       userService.logout();
  //       bannerService.open({
  //         message: 'Your Trial Has Expired',
  //         status: 'error',
  //       });
  //     }
  //     return of();
  //   })
  // );
};
