import { Component } from '@angular/core';
import {PageBodyComponent} from "../../shared/ui/page/page-body/page-body.component";
import {PageHeaderComponent} from "../../shared/ui/page/page-header/page-header.component";
import {Message} from 'primeng/message';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    PageBodyComponent,
    PageHeaderComponent,
    Message
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent {

}
