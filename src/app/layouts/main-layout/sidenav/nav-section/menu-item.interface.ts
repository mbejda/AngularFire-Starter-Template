export interface MenuItem {
  label: string;
  routerLink?: string;
  command?: () => void;
  items?: MenuItem[];
  icon?: string; // PrimeNG icon name
}

export interface NavSection {
  title?: string;
  routerLink?: string;
  icon?: string; // PrimeNG icon name
  items?: MenuItem[];
}

