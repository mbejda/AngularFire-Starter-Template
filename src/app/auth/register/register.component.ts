import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimeNgModules } from '../../shared/modules/prime-ng.module';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Password } from 'primeng/password';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import {FormFieldComponent} from "../../shared/components/form-field/form-field.component";
import {passwordMatchValidator} from '../../shared/validators';
import {AuthCardLayoutComponent} from "../../shared/components/cards/auth-card-layout/auth-card-layout.component";
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {PasswordInputComponent} from '../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [...PrimeNgModules, Password, RouterModule, ReactiveFormsModule, CommonModule, MessageModule, FormFieldComponent, AuthCardLayoutComponent, IconField, InputIcon, PasswordInputComponent]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  showVerificationMessage = false;
  registeredEmail: string = '';
  errorMessage:string;
  infoMessage:string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.registeredEmail = this.registerForm.value.email;

    this.authService.registerUser(
      this.registerForm.value.email,
      this.registerForm.value.password,
      '',
      ''
    ).pipe(
      finalize(() => {
        this.isLoading = false;
        this.registerForm.reset();
      })
    ).subscribe({
      next: () => {
        this.showVerificationMessage = true;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  sendResetEmail(btn) {
    if (!this.registeredEmail) {
      this.errorMessage = "No email address available";
      return;
    }
    btn.disabled = true;
    this.authService.resendVerificationEmail()
      .pipe(
        finalize(() =>   btn.disabled = false)
      )
      .subscribe({
        next: () => {
          this.infoMessage = `Verification email has been resent to ${this.registeredEmail}`;
          btn.disabled = true;
        },
        error: (error) => {
          this.errorMessage = error.message;

        }
      });
  }

}
