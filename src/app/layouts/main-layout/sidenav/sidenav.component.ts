import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(
    public sidenavService: SidenavService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 767) {
        this.sidenavService.open();
      } else {
        this.sidenavService.close();
      }
    }
  }
}

