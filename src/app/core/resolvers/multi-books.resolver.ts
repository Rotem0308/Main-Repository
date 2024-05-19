import { ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';
import { EMPTY, catchError, of, take } from 'rxjs';
import { BannerService } from '../services/banner.service';

export const multiBooksResolver: ResolveFn<boolean> = (route, state) => {
  const dataService = inject(DataService);
  const bannerService = inject(BannerService);

  return dataService.getAllBooks().pipe(
    take(1),
    catchError((err) => {
      console.log(err);
      bannerService.open({ message: err.error.message, status: 'error' });
      return EMPTY;
    })
  );
};
