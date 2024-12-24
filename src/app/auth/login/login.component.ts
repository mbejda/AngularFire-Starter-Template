import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { PrimeNgModules } from '../../shared/modules/prime-ng.module';
import { getFieldError, markFormGroupTouched } from '../../utils/form.utils';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ...PrimeNgModules,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    Message
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  isResending = false;
  errorMessage: string = '';
  unverifiedEmail: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
        if(loading) {
          this.loginForm.disable({emitEvent:true});
        } else {
          this.loginForm.enable({emitEvent:true});
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  getError(fieldName: string): string {
    return getFieldError(this.loginForm, fieldName);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData: any = this.loginForm.value;
      this.loadingService.setLoading(true);

      this.authService.login(formData.email, formData.password)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.loadingService.setLoading(false);
          })
        )
        .subscribe({
          next: (userCred) => {
            if (!userCred.user.emailVerified) {
              this.unverifiedEmail = formData.email;
              this.errorMessage = 'Please verify your email address before logging in.';
              return;
            }
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMessage = err.message;
          }
        });
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }

  resendVerificationEmail(): void {
    if (!this.unverifiedEmail) return;

    this.isResending = true;
    this.authService.resendVerificationEmail()
      .pipe(
        finalize(() => this.isResending = false)
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Email Sent',
            detail: `Verification email has been resent to ${this.unverifiedEmail}`
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
}
