import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PrimeNgModules } from '../../shared/prime-ng.module';
import { markFormGroupTouched } from '../../utils/form.utils';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ...PrimeNgModules,
    CommonModule,
    ReactiveFormsModule,
    Message,
  ],
  providers: [MessageService],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  isResetting = false;
  showResetSuccess = false;
  resetEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }

  sendResetEmail(): void {
    if (this.resetForm.invalid) {
      markFormGroupTouched(this.resetForm);
      return;
    }

    this.isResetting = true;
    const email = this.resetForm.get('email')?.value;

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
