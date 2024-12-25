import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { PrimeNgModules } from '../../shared/modules/prime-ng.module';
import { Message } from 'primeng/message';
import {FormFieldComponent} from '../../shared/components/form-field/form-field.component';
import {AuthCardLayoutComponent} from '../../shared/components/cards/auth-card-layout/auth-card-layout.component';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {PasswordInputComponent} from '../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ...PrimeNgModules,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    Message,
    FormFieldComponent,
    AuthCardLayoutComponent,
    IconField,
    InputIcon,
    PasswordInputComponent
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
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false]
    });
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

  protected readonly FormControl = FormControl;
}
