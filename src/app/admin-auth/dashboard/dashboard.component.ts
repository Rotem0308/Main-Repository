import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { IBook } from '../../book/models/book.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../../core/services/banner.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  books!: IBook[];
  booksAndDiscountSub!: Subscription;
  discountSub!: Subscription;
  discount!: number;
  isModalOpen: boolean = false;
  isAddModal!: boolean;
  bookToEdit!: IBook;
  constructor(
    private activateRoute: ActivatedRoute,
    private bannerService: BannerService,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksAndDiscountSub = this.activateRoute.data.subscribe({
      next: (booksFromServer: any) => {
        console.log(booksFromServer);
        this.isLoading = false;
        this.books = booksFromServer.books.books;
        console.log(booksFromServer.discount + ' this is discount');
        this.discount = booksFromServer.discount;
        console.log(this.books);
        this.bannerService.open({
          message: `Discount: ${this.discount}%`,
          status: 'success',
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.bannerService.open({
          message: err?.error?.message || null,
          status: 'error',
        });
      },
    });

    this.discountSub = this.userService.discount$.subscribe({
      next: (newDiscount) => {
        this.discount = newDiscount;
        this.bannerService.open({
          message: `Discount: ${newDiscount}%`,
          status: 'success',
        });
      },
      error: (err) => {
        this.bannerService.open({
          message: err?.error?.message || null,
          status: 'success',
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.booksAndDiscountSub?.unsubscribe();
    this.discountSub?.unsubscribe();
  }
  handleBookDelete(bookId: number) {
    this.dataService.deleteBook(bookId).subscribe({
      next: (res) => {
        console.log(res);
        this.books = this.books.filter((b) => b.id != bookId);
        this.bannerService.open({
          message: 'Book Deleted Successfully',
          status: 'success',
        });
      },
      error: (err) => {
        this.bannerService.open({
          message: err?.error?.message || null,
          status: 'error',
        });
      },
    });
  }
  handleBookModRequest(form: any) {
    console.log(form);
    if (this.isAddModal) {
      this.dataService.addBook(form).subscribe({
        next: (res) => {
          this.closeModal();
          this.bannerService.open({
            message: 'Book Created Successfully',
            status: 'success',
          });
          //switch books method
          //here i check if i already have a book with this id
          //meaning i have updated thid book so i remove it and replace it with the new book.
          const bookIndex = this.books.findIndex((b) => b.id == res.id);
          bookIndex !== -1 && this.books.splice(bookIndex, 1, res);
          // end of
          bookIndex === -1 && this.books.push(res);
        },
        error: (err) => {
          this.closeModal();
          console.log(err);
          this.bannerService.open({
            message: err?.error?.message || null,
            status: 'error',
          });
        },
      });
    } else {
      if (this.bookToEdit.id == null) return;
      this.dataService.updateBook(form, this.bookToEdit.id).subscribe({
        next: (res: any) => {
          this.closeModal();
          this.bannerService.open({
            message: 'Book Updated Successfully',
            status: 'success',
          });
          console.log(res);
          //switch books method
          //here i check if i already have a book with this id
          //meaning i have updated thid book so i remove it and replace it with the new book.

          const bookIndex = this.books.findIndex((b) => b.id == res.id);
          bookIndex !== -1 && this.books.splice(bookIndex, 1, res);
          // end of
          bookIndex === -1 && this.books.push(res);
        },
        error: (err) => {
          this.closeModal();
          console.log(err);
          this.bannerService.open({
            message: err?.error?.message || null,
            status: 'error',
          });
        },
      });
    }
  }
  openModel(type: string, book?: IBook) {
    this.isModalOpen = true;
    this.isAddModal = type === 'add';
    if (book) {
      this.bookToEdit = book;
    }
  }
  closeModal() {
    this.isModalOpen = false;
  }
  setDiscount(discountAmount: HTMLInputElement) {
    if (
      parseInt(discountAmount.value) < 0 ||
      parseInt(discountAmount.value) > 100
    ) {
      this.bannerService.open({
        message: 'Discount value must be between 0 to 100',
        status: 'error',
      });
      return;
    }

    this.userService
      .setUsersDiscount(parseInt(discountAmount.value))
      .subscribe({
        next: (res) => {
          this.userService.setDiscount(res.discountAmount);
        },
        error: (err) => {
          console.log(err);
          this.bannerService.open({
            message: err?.error?.message || null,
            status: 'error',
          });
        },
      });
  }
}
