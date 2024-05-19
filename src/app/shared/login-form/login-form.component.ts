import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() form: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  invalidPasswordMessage() {
    const errors = this.loginForm.get('password')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must enter a password';
      if (errors['minlength'])
        return 'Password Must Have At Least 8 Characters';
    }
    return '';
  }

  invalidEmailMessage() {
    const errors = this.loginForm.get('email')?.errors;
    if (errors != null) {
      if (errors['required']) return 'Must enter an email';
      if (errors['email']) return 'must be formatted: example@example.com';
    }
    return '';
  }

  handleSubmitLoginForm() {
    console.log('login form work');
    this.form.emit(this.loginForm.value);
  }
}
