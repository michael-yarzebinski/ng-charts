import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgChartsModule } from '../../../ng-charts/src/lib/ng-charts.module';

import { AppComponent } from './app.component';
import { DemoComponent } from './Components/Demo/Demo.component'
import { Docs } from './Components/Docs/Docs.component';

const appRoutes: Routes = [
    {
        path: 'Docs', component:Docs
    },
    {
        path: 'Demo', component: DemoComponent
    },
    {
        path: '**', redirectTo: 'Docs', pathMatch: 'full'
    },
    {
        path: '', redirectTo: 'Docs', pathMatch:'full'
    }
]

@NgModule({
  declarations: [
      AppComponent, Docs, DemoComponent
  ],
  imports: [
      BrowserModule, CommonModule, FormsModule, NgChartsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
