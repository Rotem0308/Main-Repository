import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IBook } from '../../book/models/book.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  @Input() isAddAction: boolean = false;
  @Input() bookToEdit!: IBook;

  @Output('closeModalButton') exitButton = new EventEmitter<void>();
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formAction: EventEmitter<any> = new EventEmitter<string>();
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {}
  //
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: this.fb.control(
        '',
        this.isAddAction
          ? [Validators.required, this.titleValidator]
          : this.titleValidator
      ),
      releaseDate: this.fb.control(
        '',
        this.isAddAction ? [Validators.required] : null
      ),
      description: this.fb.control(
        '',
        this.isAddAction
          ? [Validators.required, this.descValidator]
          : this.descValidator
      ),
      author: this.fb.control(
        '',
        this.isAddAction ? [Validators.required] : null
      ),
      genre: this.fb.control(
        '',
        this.isAddAction ? [Validators.required] : null
      ),
      price: this.fb.control(
        0.0,
        this.isAddAction
          ? [Validators.required, Validators.min(0), Validators.max(1000)]
          : [Validators.min(0), Validators.max(1000)]
      ),
      imageUrl: this.fb.control(
        '',
        this.isAddAction ? [Validators.required] : null
      ),
    });
    console.log(this.bookToEdit);
    console.log(
      this.datePipe.transform(this.bookToEdit.releaseDate, 'yyyy-mm-dd')
    );
    // console.log(this.bookToEdit.releaseDate.getUTCDate());
    this.bookForm.patchValue({
      ...this.bookToEdit,
      releaseDate: this.datePipe.transform(
        this.bookToEdit.releaseDate,
        'yyyy-MM-dd'
      ),
    });
  }

  titleValidator(control: AbstractControl) {
    const title = control.value;
    return title.length > 50 ? { titleInvalid: title } : null;
  }

  invalidTitleMessage() {
    const errors = this.bookForm.get('title')?.errors;

    if (errors != null) {
      if (errors['required']) return 'Must have a title';
      if (errors['titleInvalid']) return 'Must be less then 50 characters';
    }
    return null;
  }

  descValidator(control: AbstractControl) {
    const desc = control.value;
    return desc.length > 150 ? { descInvalid: desc } : null;
  }

  invalidDescMessage() {
    const errors = this.bookForm.get('description')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must have a description';
      if (errors['descInvalid']) return 'Must be less then 150 characters';
    }
    return null;
  }

  invalidPriceMessage() {
    const errors = this.bookForm.get('price')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must have a price';
      if (errors['min'] || errors['max'])
        return 'Price must be between 0 - 1000 ';
    }
    return null;
  }

  handleSubmitEditBookForm() {
    console.log('getting to form component');
    this.formData.emit(this.bookForm.value);
    this.formAction.emit(this.isAddAction ? 'add' : 'edit');
  }

  handleCloseModalButton() {
    this.exitButton.emit();
  }
}
