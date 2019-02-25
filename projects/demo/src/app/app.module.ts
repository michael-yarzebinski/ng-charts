import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

import { NgChartsModule } from '../../../ng-charts/src/lib/ng-charts.module';

import { AppComponent } from './app.component';
import { TooltipTemplate } from './Template'

@NgModule({
  declarations: [
      AppComponent, TooltipTemplate
  ],
  imports: [
    BrowserModule, CommonModule, FormsModule, NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
