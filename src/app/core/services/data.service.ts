import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBook } from '../../book/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private _cartBooks = new BehaviorSubject<IBook[] | null>(null);
  cartBooks$ = this._cartBooks.asObservable();

  private _booksToDisplay = new BehaviorSubject<IBook[] | null>(null);
  booksToDisplay$ = this._booksToDisplay.asObservable();

  private _booksCount = new BehaviorSubject<number>(0);
  booksCount$ = this._booksCount.asObservable();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setBooksToDisplay(books: IBook[]) {
    this._booksToDisplay.next(books);
  }
  setBooksToCount(booksCount: number) {
    this._booksCount.next(booksCount);
  }

  addBookToCart(book: IBook) {
    console.log(book);
    var books = this._cartBooks.getValue();
    if (books == null) books = [];
    books?.push(book);
    console.log(books);
    this._cartBooks.next(books);
  }
  removeBookFromCart(bookId: any) {
    var books = this._cartBooks.getValue();
    if (books != null) {
      const bookIndex = books.findIndex((b) => b.id == bookId);
      books.splice(bookIndex, 1);
    }
    this._cartBooks.next(books);
  }
  getBooksFromCart() {
    return this._cartBooks.getValue();
  }
  getCartCount() {
    return this._cartBooks.getValue()?.length;
  }

  resetCart() {
    this._cartBooks.next(null);
  }

  getAllBooks(
    skip?: number,
    limit?: number,
    searchValue?: string | null
  ): Observable<any> {
    console.log(skip, limit);

    if (skip != null && limit != null) {
      if (searchValue != null) {
        return this.http.get(
          `${environment.URL_API}/BookStore/Books/?skip=${skip}&limit=${limit}&searcValue=${searchValue}`
        );
      }
      return this.http.get(
        `${environment.URL_API}/BookStore/Books/?skip=${skip}&limit=${limit}`
      );
    }
    return this.http.get(`${environment.URL_API}/BookStore/Books`);
  }

  // getNextPage(page: number) {}

  getBookById(bookID: number): Observable<any> {
    return this.http.get<IBook>(
      `${environment.URL_API}/BookStore/Books/${bookID}`
    );
  }

  addBook(book: IBook): Observable<any> {
    return this.http.post(`${environment.URL_API}/BookStore/Books/Admin`, book);
  }

  deleteBook(bookID: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_API}/BookStore/Books/Admin/${bookID}`
    );
  }

  updateBook(bookToUpdate: any, bookId: number) {
    return this.http.patch(
      `${environment.URL_API}/BookStore/Books/Admin/${bookId}`,
      bookToUpdate
    );
  }
}
