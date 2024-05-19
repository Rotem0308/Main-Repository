import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBanner } from '../models/banner.model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor() {}

  private _banner = new BehaviorSubject<IBanner | null>(null);
  banner$ = this._banner.asObservable();

  open(banner: IBanner) {
    banner.message = banner.message == null ? 'Unknown Error' : banner.message;
    console.log(banner.message);
    this._banner.next(banner);
  }
  close() {
    this._banner.next(null);
  }
}
