import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss'
})
export class CheckoutModalComponent {
  @Output() buttonClick = new EventEmitter<void>();

}
