import { FormGroup } from '@angular/forms';
import { LOGIN_VALIDATION_MESSAGES } from '../constants/validation-messages';

export function getFieldError(form: FormGroup, fieldName: string): string {
  const control = form.get(fieldName);
  if (!control?.errors || !control.touched) return '';

  const firstError = Object.keys(control.errors)[0];
  return LOGIN_VALIDATION_MESSAGES[fieldName][firstError] || 'Invalid input';
}

export function markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    if (control instanceof FormGroup) {
      markFormGroupTouched(control);
    }
  });
}
