import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordRGX } from '../../../utilities/consts';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
})
export class EditUserModalComponent {
  @Output('closeModalButton') exitButton = new EventEmitter<void>();
  @Output('editForm') editData: EventEmitter<any> = new EventEmitter<any>();
  @Input() user: IUser | null = null;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      email: this.fb.control('', [Validators.email]),
      password: this.fb.control('', [
        Validators.minLength(8),
        Validators.pattern(passwordRGX),
        this.confirmPasswordValidator,
      ]),
      confirmPassword: this.fb.control('', [this.confirmPasswordValidator]),
    });
    console.log(this.user);
    if (this.user != null) this.editForm.patchValue(this.user);
  }

  confirmPasswordValidator(control: AbstractControl) {
    const parent = control.parent;
    if (parent == null) return null;
    //to make sure parent is only of type either formGroup
    const password: string = parent.getRawValue()['password'];
    const confirmPassword: string = parent.getRawValue()['confirmPassword'];

    if (password == '' || confirmPassword == '') return null;
    console.log(password, confirmPassword);
    return password !== confirmPassword
      ? { ['confirmPassInvalid']: confirmPassword }
      : null;
  }

  invalidPasswordMessage(): string | null {
    const errors = this.editForm.get('password')?.errors;
    if (errors != null) {
      if (errors['confirmPassInvalid'])
        return 'Confirmed Password Must Be The Identical to the Password';
      if (errors['minlength'])
        return 'Password Must Have At Least 8 Characters';
      if (errors['pattern'])
        return 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
      if (errors['confirmPassInvalid'])
        return 'Password Must Be The Identical to the Confirmed Password';
    }
    return null;
  }

  invalidConfirmPasswordMessage(): string | null {
    const errors = this.editForm.get('confirmPassword')?.errors;
    if (errors != null) {
      if (errors['confirmPassInvalid'])
        return 'Confirmed Password Must Be The Identical to the Password';
    }
    return null;
  }

  invalidEmailMessage(): string | null {
    const errors = this.editForm.get('email')?.errors;
    if (errors != null) {
      if (errors['email'])
        return 'Email must be formmated : example@example.com';
    }
    return null;
  }

  handleSubmitEditForm() {
    console.log('getting to form component');
    this.editData.emit(this.editForm.value);
  }
  handleCloseModalButton() {
    this.exitButton.emit();
  }
}
