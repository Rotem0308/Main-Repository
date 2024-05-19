import { ActivatedRoute, ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';
import { EMPTY, catchError, of, take } from 'rxjs';
import { BannerService } from '../services/banner.service';

export const singleBookResolver: ResolveFn<any> = (route, state) => {
  // const dataService = inject(DataService);
  // const bookID: string | null = dataService.getBookID();
  // if (bookID == null) return false;
  // return dataService.getBookById(bookID).pipe(take(1));

  const dataService = inject(DataService);
  const bannerService = inject(BannerService);

  const bookId: number = route.params['id'];
  console.log(bookId);
  return dataService.getBookById(bookId).pipe(
    take(1),
    catchError((err) => {
      console.log(err);
      bannerService.open({ message: err.error.message, status: 'err' });
      return EMPTY;
    })
  );
};
