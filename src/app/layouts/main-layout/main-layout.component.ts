import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavComponent } from './sidenav/sidenav.component';
import {NavSectionComponent} from './sidenav/nav-section/nav-section.component';
import {NavSection} from './sidenav/nav-section/menu-item.interface';
import {HamburgerMenuComponent} from './sidenav/hamburger/hamburger-menu.component';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, SidenavComponent, NavSectionComponent, HamburgerMenuComponent, LoadingIndicatorComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  headerSection: NavSection = {
    title:'Dashboard',
    icon: 'pi pi-home',
    routerLink:'/dashboard'
  };

  bodySection: NavSection[] = [
    {
      title: 'Main Menu',
      icon: 'pi pi-list',
      items: [
        {
          label: 'Profile',
          routerLink: '/profile'
        },
        {
          label: 'Posts',
          items: [
            { label: 'All Posts', routerLink: '/posts/all' },
            { label: 'Add New', routerLink: '/posts/new' }
          ]
        },
        {
          label: 'Media',
          routerLink: '/media'
        }
      ]
    },
    {
      title: 'Management',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Users',
          routerLink: '/users'
        },
        {
          label: 'Settings',
          routerLink: '/settings'
        }
      ]
    }
  ];

  footerSection: NavSection = {
    icon: 'pi pi-user',
    items: [
      {
        label: 'Logout',
        command: () => console.log('Logout clicked')
      }
    ]
  };
}
