import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrimeNgModules} from './shared/prime-ng.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,...PrimeNgModules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-solar-placer';
}
