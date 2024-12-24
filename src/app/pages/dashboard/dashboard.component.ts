// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import {PrimeNgModules} from '../../shared/prime-ng.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [...PrimeNgModules]
})
export class DashboardComponent {
  // Dashboard logic here
}
