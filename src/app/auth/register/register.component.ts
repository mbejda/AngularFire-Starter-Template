import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimeNgModules } from '../../shared/modules/prime-ng.module';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Password } from 'primeng/password';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [...PrimeNgModules, Password, RouterModule, ReactiveFormsModule, CommonModule, MessageModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  isResending = false;
  showVerificationMessage = false;
  registeredEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
      }
    });
  }

  resendVerificationEmail() {
    if (!this.registeredEmail) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No email address available'
      });
      return;
    }

    this.isResending = true;
    this.authService.resendVerificationEmail()
      .pipe(
        finalize(() => this.isResending = false)
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Verification email has been resent to ${this.registeredEmail}`
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message
          });
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
