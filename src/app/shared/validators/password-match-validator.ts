import { FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPasswordControl = group.get('confirmPassword');

  if (password && confirmPasswordControl) {
    if (password !== confirmPasswordControl.value) {
      const existingErrors = confirmPasswordControl.errors || {};
      confirmPasswordControl.setErrors({ ...existingErrors, passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const existingErrors = confirmPasswordControl.errors || {};
      delete existingErrors['passwordMismatch']; // Use bracket notation

      if (Object.keys(existingErrors).length === 0) {
        confirmPasswordControl.setErrors(null); // Clear errors if no other errors exist
      } else {
        confirmPasswordControl.setErrors(existingErrors); // Update with remaining errors
      }
      return null;
    }
  }
  return null;
}
