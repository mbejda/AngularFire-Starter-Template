import { Component } from '@angular/core';
import {PrimeNgModules} from '../../shared/modules/prime-ng.module';
import {PageModule} from '../../shared/ui/page/page.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [...PrimeNgModules, PageModule]
})
export class DashboardComponent {
  // Dashboard logic here
}
