import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit, OnDestroy {
  @Input() control!: AbstractControl; // Form control for validation
  @Input() label: string = ''; // Label text
  @Input() labelSize: 'large' | 'regular' | 'small' = 'regular'; // Label size (dynamic styling)
  @Input() customErrorMessages: { [key: string]: string } = {}; // Custom error messages map

  private subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.control) {
      // Listen to value and status changes
      const valueChangeSub = this.control.valueChanges.subscribe(() => this.cdr.markForCheck());
      const statusChangeSub = this.control.statusChanges.subscribe(() => this.cdr.markForCheck());

      this.subscriptions.push(valueChangeSub, statusChangeSub);
    }
  }

  get errorMessages(): string[] {
    const errors: string[] = [];

    if (this.control?.errors && (this.control.touched || this.control.dirty)) {
      const errorKeys = Object.keys(this.control.errors);

      for (const key of errorKeys) {
        // Check for custom error messages
        if (this.customErrorMessages[key]) {
          errors.push(this.customErrorMessages[key]);
        } else {
          // Default messages for standard Angular validators
          switch (key) {
            case 'required':
              errors.push(`${this.label || 'This field'} is required.`);
              break;
            case 'minlength':
              errors.push(
                `Must be at least ${this.control.errors['minlength'].requiredLength} characters long.`
              );
              break;
            case 'maxlength':
              errors.push(
                `Cannot exceed ${this.control.errors['maxlength'].requiredLength} characters.`
              );
              break;
            case 'email':
              errors.push(`Please enter a valid email address.`);
              break;
            case 'pattern':
              errors.push(`The value entered does not match the required pattern.`);
              break;
            case 'passwordMismatch':
              errors.push(`Passwords do not match.`);
              break;
            case 'invalidEmail':
              errors.push(`Invalid Email.`);
              break;
            default:
              errors.push(`Invalid value.`);
              break;
          }
        }
      }
    }

    return errors;
  }

  get labelClass(): string {
    switch (this.labelSize) {
      case 'large':
        return 'text-lg font-bold';
      case 'small':
        return 'text-sm font-medium';
      default:
        return 'text-base font-medium';
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
