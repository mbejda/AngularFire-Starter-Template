import { Component } from '@angular/core';
import {Message} from "primeng/message";
import {PageBodyComponent} from "../../shared/ui/page/page-body/page-body.component";
import {PageHeaderComponent} from "../../shared/ui/page/page-header/page-header.component";
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    Message,
    PageBodyComponent,
    PageHeaderComponent,
    Button,
    ButtonDirective
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {

}
