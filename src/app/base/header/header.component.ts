import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';
import { DataService } from '../../core/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isLoggedin!: boolean;
  user: IUser | null = null;
  cartDataSub!: Subscription;
  cartCount: number = 0;
  userSub!: Subscription;
  isAdminUser: boolean = false;
  isAdminSub!: Subscription;
  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}
  ngOnDestroy(): void {
    this.cartDataSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.isAdminSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedin = false;

    this.isAdminSub = this.userService.isAdmin$.subscribe({
      next: (res) => {
        this.isAdmin = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.userSub = this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.isLoggedin = user != null;
        console.log(this.user);
      },
      error: () => {
        console.log('cannot reached token in header component');
      },
    });
    this.cartDataSub = this.dataService.cartBooks$.subscribe((res) => {
      this.cartCount = 0;
      if (res != null) {
        this.cartCount = res.length;
      }
    });
  }

  isHamburgerOpen: boolean = false;
  openNavList() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  }

  handleLogoutButton() {
    this.userService.logout();
  }
}
