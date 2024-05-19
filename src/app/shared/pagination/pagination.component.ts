import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() currentPage: number = 1;
  // @Input() totalItems: number = 0;
  totalItems: number = 0;
  bookCountSub!: Subscription;
  @Input() limit: number = 5;
  @Output() changedPageNumber = new EventEmitter<number>();

  constructor(private dataService: DataService, private router: Router) {}

  totalPages!: number;
  pages: number[] = [];
  ngOnInit(): void {
    this.dataService.booksCount$.subscribe({
      next: (res) => {
        this.totalItems = res;
        console.log(this.totalItems);
        this.totalPages = Math.ceil(this.totalItems / this.limit);
        console.log(this.totalPages);
        this.range(1, this.totalPages);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // this.dataService.getAllBooks(this.currentPage - 1, this.limit).subscribe({
    //   next: (res) => {
    //     this.totalItems = res.bookCount;
    //     console.log(this.totalItems);
    //     this.totalPages = Math.ceil(this.totalItems / this.limit);
    //     console.log(this.totalPages);
    //     this.range(1, this.totalPages);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    // //number of pages is equal to the number of item divides by the number of items per page
    // //and we round up with math/ciel so if we have spair items the will have a page of their own
    // console.log(this.totalItems);
    // this.totalPages = Math.ceil(this.totalItems / this.limit);
    // console.log(this.totalPages);
    // this.range(1, this.totalPages); //total pages here represent the last possible page,meanning the end number
  }

  range(start: number, end: number) {
    //why (p + start)? because we want to start with the page number we decide.
    // Array.from([this.totalPages]) - create an array of numbers
    //.key - show indexes
    //.map - add 1 to each index
    this.pages = [...Array(end).keys()].map((p) => p + start);
  }

  ngOnDestroy(): void {
    this.bookCountSub?.unsubscribe();
  }
}
