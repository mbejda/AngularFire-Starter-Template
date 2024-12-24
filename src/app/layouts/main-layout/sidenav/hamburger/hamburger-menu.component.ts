import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {
  constructor(private sidenavService: SidenavService) {}

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}

