import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../models/book.model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
})
export class BookInfoComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  book!: IBook;
  bookSub!: Subscription;
  ngOnInit(): void {
    this.bookSub = this.activatedRoute.data.subscribe({
      next: (books: any) => {
        console.log(books.book);
        this.book = books.book; //here i gave up on getting specific IBook model and set res to any
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
