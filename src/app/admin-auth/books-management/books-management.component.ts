import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from '../../book/models/book.model';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrl: './books-management.component.scss',
})
export class BooksManagementComponent {
  @Input() books!: IBook[];
  @Output() editButton = new EventEmitter<IBook>();
  @Output() deleteButton = new EventEmitter<number>();
  showDesc: boolean = false;
  descIndex!: number;
  handleEditButton(book: IBook) {
    console.log(book);
    if (book != null) this.editButton.emit(book);
  }
  handleDeleteButton(book: IBook) {
    this.deleteButton.emit(book.id);
  }
  onDescClick(number: number) {
    this.showDesc = !this.showDesc;
    this.descIndex = number;
  }
}
