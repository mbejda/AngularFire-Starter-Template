import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from './page-header/page-header.component';
import {PageBodyComponent} from './page-body/page-body.component';




@NgModule({
  declarations: [],
  exports: [
    PageHeaderComponent,
    PageBodyComponent
  ],
  imports: [
    PageHeaderComponent,
    PageBodyComponent,
  ]
})
export class PageModule { }
