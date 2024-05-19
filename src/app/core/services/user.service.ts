import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../models/user.model';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BannerService } from './banner.service';
import { IBanner } from '../models/banner.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isRefreshed: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private bannerService: BannerService
  ) {
    // this.onReload();
  }

  private _token = new BehaviorSubject<string | null>(null);
  token$ = this._token.asObservable();

  private _user = new BehaviorSubject<IUser | null>(null);
  user$ = this._user.asObservable();

  private _discount = new Subject<number>();
  discount$ = this._discount.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin.asObservable();

  // isAdmin: boolean = false;
  // user: IUser | null = null;

  setDiscount(newDiscount: number) {
    this._discount.next(newDiscount);
  }

  onReload() {
    const token = localStorage.getItem('TOKEN');
    console.log(token);
    if (token) {
      this._token.next(token);

      this.getUser().subscribe({
        next: (res) => {
          this._user.next(res.user);
          this._isAdmin.next(res.role === 'Admin');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getAuthToken() {
    return this._token.getValue();
  }
  getUserId() {
    return this._user.getValue()?.id;
  }
  setToken(token: string) {
    this._token.next(token);
  }

  onSuccessfullUpdate(userFromServer: IUser) {
    this._user.next(userFromServer);

    this.bannerService.open({
      message: 'User Updated Successfully',
      status: 'success',
    });
  }

  onSuccessfullLogin(token: string, role: string, userFromServer: IUser) {
    this.bannerService.open({
      message: 'LoggedIn Successfully',
      status: 'success',
    });
    this.setToken(token);
    localStorage.setItem('TOKEN', token);

    this._isAdmin.next(role === 'admin');
    //first we change the role to be admin so any subscriber/observer will get the newest information about the user
    this._user.next(userFromServer);
    this.router.navigate([
      `/${this._isAdmin.getValue() ? 'admin' : 'user'}/info`,
    ]);
  }

  userLogin(data: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `${environment.URL_API}/BookStore/Account/Login/user`,
      data
    );
  }

  adminLogin(data: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `${environment.URL_API}/BookStore/Account/Login/admin`,
      data
    );
  }

  signup(user: IUser): Observable<any> {
    return this.http.post<IUser>(
      `${environment.URL_API}/BookStore/Account/Signup`,
      user
    );
  }

  getUser(): Observable<any> {
    return this.http.get<{ role: string; user: IUser }>(
      `${environment.URL_API}/BookStore/Account/User`
    );
  }

  editInfo(user: IUser): Observable<any> {
    return this.http.patch(
      `${environment.URL_API}/BookStore/Account/Update`,
      user
    );
  }

  getDiscount(userId: string): Observable<any> {
    return this.http.get(`${environment.URL_API}/BookStore/Account/Discount`);
  }

  setUsersDiscount(discount: number): Observable<any> {
    return this.http.get(
      `${environment.URL_API}/BookStore/Account/Discount/${discount}`
    );
  }

  logout() {
    this._user.next(null);
    this._isAdmin.next(false);
    this._token.next(null);
    localStorage.removeItem('TOKEN');
    const banner: IBanner = {
      message: 'logged Out Successfully',
      status: 'success',
    };
    this.bannerService.open(banner);
    this.router.navigate([``]);
  }
}
