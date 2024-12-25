import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PrimeNgModules } from '../../shared/modules/prime-ng.module';
import { Message } from 'primeng/message';
import {FormFieldComponent} from '../../shared/components/form-field/form-field.component';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {AuthCardLayoutComponent} from '../../shared/components/cards/auth-card-layout/auth-card-layout.component';
import {PasswordInputComponent} from '../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ...PrimeNgModules,
    CommonModule,
    ReactiveFormsModule,
    Message,
    FormFieldComponent,
    IconField,
    InputIcon,
    AuthCardLayoutComponent,
    PasswordInputComponent,
  ],
  providers: [MessageService],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isResetting = false;
  showResetSuccess = false;
  resetEmail = 'mbejda@live.com';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  sendResetEmail(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Email not found';
      return;
    }

    this.isResetting = true;
    const email = this.form.get('email')?.value;

    this.authService.sendPasswordResetEmail(email)
      .pipe(
        finalize(() => this.isResetting = false)
      )
      .subscribe({
        next: () => {
          this.resetEmail = email;
          this.showResetSuccess = true;
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
}
