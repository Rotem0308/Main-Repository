import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from '../../book/models/book.model';
import { DataService } from '../../core/services/data.service';
import { BannerService } from '../../core/services/banner.service';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartSub!: Subscription;
  cartBooks!: IBook[];
  displayBooks: IBook[] = [];
  totalPrice: number = 0;
  user: IUser | null = null;
  userSub!: Subscription;
  userDiscount!: number;
  isModelOpen: boolean = false;
  constructor(
    private dataService: DataService,
    private bannerService: BannerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService.user$.subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
      },
      error: () => {},
    });

    this.cartSub = this.dataService.cartBooks$.subscribe({
      next: (books) => {
        if (books != null) {
          this.cartBooks = books;
          if (this.cartBooks.length >= 2) {
            this.cartBooks = this.cartBooks.sort((a: any, b: any) => {
              return b.id - a.id;
            });
          }
          this.totalSum(this.cartBooks);
          if ((this.cartBooks, length === 0)) this.displayBooks = [];
          this.cartBooks.forEach((cartBook) => {
            if (
              this.displayBooks.filter((b) => b.id == cartBook.id).length === 0
            ) {
              console.log(cartBook);
              this.displayBooks.push(cartBook);
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeModalState() {
    this.isModelOpen = !this.isModelOpen;
  }

  checkOut() {
    this.displayBooks = [];
    this.totalPrice = 0;
    this.cartBooks = [];
    this.dataService.resetCart();
    this.isModelOpen = !this.isModelOpen;
  }

  getQuantity(bookId: any) {
    return this.cartBooks.filter((b) => b.id === bookId).length;
  }
  getTotalPrice(book: IBook) {
    return this.getQuantity(book.id) * book.price;
  }

  RemoveBookFromCart(bookId: any) {
    this.bannerService.open({
      message: 'Book Was Removed Successfully',
      status: 'success',
    });

    this.dataService.removeBookFromCart(bookId);
  }
  AddBookToCart(book: IBook) {
    this.bannerService.open({
      message: 'Book Was Added Successfully',
      status: 'success',
    });
    this.dataService.addBookToCart(book);
  }
  totalSum(books: IBook[]) {
    let totalSum: number = 0;
    books.forEach((book) => {
      totalSum += book.price;
    });

    if (this.user != null && this.user.discount) {
      this.userDiscount = totalSum * (this.user.discount / 100);
      this.totalPrice = totalSum - this.userDiscount;
    } else {
      this.totalPrice = totalSum;
    }
  }
  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.userSub.unsubscribe();
  }
}
