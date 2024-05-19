import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from '../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input('bookToShow') book!: IBook;
  @Output() iconClick = new EventEmitter<string>();

  onIconClick(wantedAction: string) {

    this.iconClick.emit(wantedAction);
  }
}
