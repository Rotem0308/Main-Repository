import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { IBook } from '../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private dataService: DataService, private router: Router) {}

  // booksCount: number = 0;
  booksToManipulate: IBook[] = [];
  currentPage: number = 1;
  limit: number = 5;
  skip: number = 0;
  searchValue: string | null = null;
  ngOnInit(): void {
  
    this.dataService.getAllBooks(this.skip, this.limit).subscribe({
      next: (res) => {
        this.booksToManipulate = res.books;
        this.dataService.setBooksToCount(res.bookCount);
        this.dataService.setBooksToDisplay(res.books);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getBooksByPage(pageNumber: number) {
    this.currentPage = pageNumber;

    this.skip = (this.currentPage - 1) * this.limit;
    console.log(this.skip, this.limit);

    this.dataService
      .getAllBooks(this.skip, this.limit, this.searchValue)
      .subscribe({
        next: (res) => {
          this.booksToManipulate = res.books;
          this.dataService.setBooksToCount(res.bookCount);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleBookAction(bookAction: string, book: IBook) {
    console.log(bookAction);
    console.log(book);
    if (bookAction == 'info') this.router.navigate([`/${book.id}`]);
    else {
      //go to cart and add this book with the given id
      this.dataService.addBookToCart(book);
    }
  }

  handleSearch(input: HTMLInputElement) {
    this.searchValue = input.value;

    this.dataService
      .getAllBooks(this.skip, this.limit, this.searchValue)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.booksToManipulate = res.books;
          this.dataService.setBooksToCount(res.bookCount);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
