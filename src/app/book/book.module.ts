import { NgModule } from '@angular/core';
import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './books/books.component';
import { SharedModule } from '../shared/shared.module';
import { BookCardComponent } from './book-card/book-card.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooksComponent, BookCardComponent, BookInfoComponent],
  imports: [SharedModule, BookRoutingModule, FormsModule],
  exports: [BooksComponent, BookInfoComponent],
})
export class BookModule {}
