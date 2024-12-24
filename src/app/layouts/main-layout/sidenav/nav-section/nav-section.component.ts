import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavSection, MenuItem } from './menu-item.interface';

@Component({
  selector: 'app-nav-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.scss']
})
export class NavSectionComponent {
  @Input() sections: NavSection | NavSection[] = [];

  expandedItems: Set<string> = new Set();

  constructor(private router: Router) {}

  get currentRoute(): string {
    return this.router.url;
  }

  get sectionArray(): NavSection[] {
    return Array.isArray(this.sections) ? this.sections : [this.sections];
  }

  toggleItem(item: MenuItem): void {
    if (item.items && item.items.length > 0) {
      if (this.expandedItems.has(item.label)) {
        this.expandedItems.delete(item.label);
      } else {
        this.expandedItems.add(item.label);
      }
    }
  }

  isExpanded(item: MenuItem): boolean {
    return this.expandedItems.has(item.label);
  }
}
