import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {Checkbox} from 'primeng/checkbox';
import {FormFieldComponent} from '../../form-field/form-field.component';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {NgIf} from '@angular/common';
import {Password} from 'primeng/password';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth-card-layout',
  standalone: true,
  imports: [
    ButtonDirective,
    Card,
    Checkbox,
    FormFieldComponent,
    InputText,
    Message,
    NgIf,
    Password,
    ReactiveFormsModule
  ],
  templateUrl: './auth-card-layout.component.html',
  styleUrl: './auth-card-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AuthCardLayoutComponent {
  @Input() title: string = ''; // The title of the form
  @Input() subtitle: string = ''; // The subtitle of the form
  @Input() logo?: string; // Optional logo (URL to the image)
  @Input() errorMessage:string;
  @Input() infoMessage:string;

}

