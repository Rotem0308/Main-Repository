import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordRGX } from '../../../../utilities/consts';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  signupForm!: FormGroup;
  @Output() signupData: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(passwordRGX),
        this.confirmPasswordValidator,
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        this.confirmPasswordValidator,
      ]),
    });
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
    const errors = this.signupForm.get('password')?.errors;
    if (errors != null) {
      if (errors['confirmPassInvalid'])
        return 'Confirmed Password Must Be The Identical to the Password';
      if (errors['required']) return 'Must Have Password';
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
    const errors = this.signupForm.get('confirmPassword')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must Have a confirmed Password';
      if (errors['confirmPassInvalid'])
        return 'Confirmed Password Must Be The Identical to the Password';
    }
    return null;
  }

  invalidEmailMessage(): string | null {
    const errors = this.signupForm.get('email')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must Have An Email';
      if (errors['email'])
        return 'Email must be formmated : example@example.com';
    }
    return null;
  }

  handleSubmitSignupForm() {
    console.log('signup working');
    this.signupData.emit(this.signupForm.value);
  }
}
