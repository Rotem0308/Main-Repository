import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input('userToDisplay') user!: IUser;
  @Output() infoBtnclick: EventEmitter<void> = new EventEmitter<void>();
  handleEditButtonClick() {
    this.infoBtnclick.emit();
  }
}
